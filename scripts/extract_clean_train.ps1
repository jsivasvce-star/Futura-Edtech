Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\akash\.gemini\antigravity-ide\brain\d1d10773-2c3c-4e7f-8f42-9b2e12eba1ac\maglev_bullet_3car_clean_1790383090026.jpg"
$destPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$bmp.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)

$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $brightness = ($c.R + $c.G + $c.B) / 3.0

        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            if ($brightness -ge 249) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $alpha = [int]((249.0 - $brightness) / 9.0 * 255.0)
                if ($alpha -lt 0) { $alpha = 0 }
                if ($alpha -gt 255) { $alpha = 255 }
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
                if ($alpha -gt 30) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        } else {
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$cropX = [Math]::Max(0, $minX)
$cropY = [Math]::Max(0, $minY)
$cropW = [Math]::Min($bmp.Width - $cropX, $maxX - $minX)
# Crop above the bottom grey rail
$cropH = 145

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $outBmp.Clone($rect, $outBmp.PixelFormat)
$croppedBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$outBmp.Dispose()
$croppedBmp.Dispose()

Write-Host "Success! Clean Maglev Train ready: $cropW x $cropH"
