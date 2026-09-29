Add-Type -AssemblyName System.Drawing

$p1 = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656323957.jpg"
$p2 = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$p3 = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

$img1 = [System.Drawing.Image]::FromFile($p1)
Write-Host "BG: $($img1.Width)x$($img1.Height)"
$img1.Dispose()

$bmp2 = New-Object System.Drawing.Bitmap($p2)
Write-Host "Car1 (media...33745): $($bmp2.Width)x$($bmp2.Height) - Pixel(0,0): $($bmp2.GetPixel(0,0)) - Pixel(w/2, 0): $($bmp2.GetPixel([int]($bmp2.Width/2), 0)) - Pixel(0, h-1): $($bmp2.GetPixel(0, $bmp2.Height - 1))"
$bmp2.Dispose()

$bmp3 = New-Object System.Drawing.Bitmap($p3)
Write-Host "Car2 (media...13019): $($bmp3.Width)x$($bmp3.Height) - Pixel(0,0): $($bmp3.GetPixel(0,0)) - Pixel(w/2, 0): $($bmp3.GetPixel([int]($bmp3.Width/2), 0)) - Pixel(0, h-1): $($bmp3.GetPixel(0, $bmp3.Height - 1))"
$bmp3.Dispose()
