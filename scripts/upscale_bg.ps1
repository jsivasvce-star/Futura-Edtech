Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\akash\.gemini\antigravity-ide\brain\307f8e69-1a62-47a3-98a5-2f9dfe7268c4\.user_uploaded\media_1790512223274.png"
$destPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\alpine_lake_viaduct_bg_hd.png"

$src = [System.Drawing.Image]::FromFile($srcPath)
$newW = $src.Width * 3 # 3072 px
$newH = $src.Height * 3 # 1026 px
$dest = New-Object System.Drawing.Bitmap $newW, $newH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($src, 0, 0, $newW, $newH)
$g.Dispose()
$src.Dispose()

$dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
Write-Output "3K HD Image saved successfully to $destPath"
