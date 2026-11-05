# Generates web-sized derivatives of the project screenshots and the profile photo.
# (Underdraw's source is a capture of the live site's built-in sample artwork, in scripts/source-images/.)
#   public/projects/<id>.jpg        max 1280px wide, used by cards and the project detail view
#   public/projects/<id>-thumb.jpg  224px square crop, used by the graph nodes
#   public/profile.jpg              480px square crop of the profile photo
# The original PNG/JPEG sources are left untouched. Run from the repo root:
#   powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root 'public\projects'
New-Item -ItemType Directory -Force $outDir | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

function Save-Jpeg($bitmap, $path, $quality) {
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bitmap.Save($path, $jpegCodec, $params)
}

function Resize-Crop($src, [int]$sx, [int]$sy, [int]$sw, [int]$sh, [int]$dw, [int]$dh) {
  $dst = New-Object System.Drawing.Bitmap($dw, $dh)
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $dw, $dh)), $sx, $sy, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  return $dst
}

# source file -> output id
$projects = @{
  'scholarly.png'   = 'scholarly'
  'smritisetu.png'  = 'smritisetu'
  'squawk.png'      = 'squawk'
  'relay.png'       = 'relay'
  'salespilot.png'  = 'salespilot'
  'vintner.png'     = 'vintner'
  'fittyfit.png'    = 'fittyfit'
  'task.png'        = 'pulse'
  'blog.png'        = 'logbook'
}

foreach ($file in $projects.Keys) {
  $id = $projects[$file]
  $img = [System.Drawing.Image]::FromFile((Join-Path $root "public\$file"))

  $w = [Math]::Min(1280, $img.Width)
  $h = [int][Math]::Round($img.Height * $w / $img.Width)
  $full = Resize-Crop $img 0 0 $img.Width $img.Height $w $h
  Save-Jpeg $full (Join-Path $outDir "$id.jpg") 82
  $full.Dispose()

  $side = [Math]::Min($img.Width, $img.Height)
  $thumb = Resize-Crop $img ([int](($img.Width - $side) / 2)) 0 $side $side 224 224
  Save-Jpeg $thumb (Join-Path $outDir "$id-thumb.jpg") 84
  $thumb.Dispose()

  $img.Dispose()
  "{0,-12} {1}x{2}" -f $id, $w, $h
}

# Underdraw: studio screenshot (2880x1732) -> full image + a square thumbnail centred on the artwork.
$ud = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot 'source-images/underdraw-studio.png'))
$w = [Math]::Min(1280, $ud.Width)
$h = [int][Math]::Round($ud.Height * $w / $ud.Width)
$full = Resize-Crop $ud 0 0 $ud.Width $ud.Height $w $h
Save-Jpeg $full (Join-Path $outDir 'underdraw.jpg') 84
$full.Dispose()
$side = [int]($ud.Height * 0.7217)
$thumb = Resize-Crop $ud ([int]($ud.Width * 0.2170)) ([int]($ud.Height * 0.1472)) $side $side 224 224
Save-Jpeg $thumb (Join-Path $outDir 'underdraw-thumb.jpg') 86
$thumb.Dispose()
$ud.Dispose()
"{0,-12} {1}x{2}" -f 'underdraw', $w, $h

# Profile photo: head-and-shoulders crop of the full-length portrait.
$photo = [System.Drawing.Image]::FromFile((Join-Path $root 'src\assets\portfolio image.jpeg'))
$avatar = Resize-Crop $photo 270 560 430 430 480 480
Save-Jpeg $avatar (Join-Path $root 'public\profile.jpg') 86
$avatar.Dispose()
$photo.Dispose()
'profile      480x480'
