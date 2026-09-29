Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('c:\projects\Futura-Edtech\public\MagnetInteraction\wooden_board_blank.png')
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# Find the plaque plate: it has two brass screws / gold edges around X: 250..750, Y: 10..60
# Let's inspect the bounding box of the top inner plaque plate
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

# Let's scan pixels in top 35% of the image (Y < 70)
# Look for the plate surface
for ($y = 5; $y -lt 65; $y++) {
    for ($x = 240; $x -lt 760; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Check if pixel has distinct color of the plate
        if ($c.A -gt 200) {
            # Plate area
        }
    }
}

# Let's find the inner usable area of the plate
# Let's check horizontal profile at Y = 28
Write-Host "Horizontal profile at Y=28:"
for ($x = 240; $x -le 760; $x += 20) {
    $c = $bmp.GetPixel($x, 28)
    Write-Host "X=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

# Let's check vertical profile at center X = 500
Write-Host "Vertical profile at X=500:"
for ($y = 0; $y -le 70; $y += 3) {
    $c = $bmp.GetPixel(500, $y)
    Write-Host "Y=$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$bmp.Dispose()
