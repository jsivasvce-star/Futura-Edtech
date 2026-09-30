Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790674618576.png"
$destPath = "c:\projects\Futura-Edtech\public\MagnetInteraction\wooden_board_blank.png"

$bmp = New-Object System.Drawing.Bitmap($srcPath)
Write-Host "Source Dimensions: $($bmp.Width) x $($bmp.Height)"

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 20 -or $c.G -gt 20 -or $c.B -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Crop Box: Left=$minX, Top=$minY, Right=$maxX, Bottom=$maxY"
$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
Write-Host "Cropped size: ${cropW} x ${cropH}"

$rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$croppedBmp = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Now, transparentize any lingering pure black background pixels outside the board boundaries
# Check edges / corners and make near-black pixels transparent
for ($y = 0; $y -lt $croppedBmp.Height; $y++) {
    for ($x = 0; $x -lt $croppedBmp.Width; $x++) {
        $c = $croppedBmp.GetPixel($x, $y)
        if ($c.R -lt 15 -and $c.G -lt 15 -and $c.B -lt 15) {
            $croppedBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$croppedBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved successfully to $destPath"

$bmp.Dispose()
$croppedBmp.Dispose()
