Add-Type -AssemblyName System.Drawing

$srcPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Clean level crop across the entire bottom base
$cleanH = 145
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $cleanH)
$outBmp = $bmp.Clone($rect, $bmp.PixelFormat)

$bmp.Dispose()
$outBmp.Save("c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

Remove-Item $srcPath
Move-Item "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_clean.png" $srcPath

Write-Host "Cleaned bottom level crop: 1376 x $cleanH"
