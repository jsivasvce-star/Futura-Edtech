Add-Type -AssemblyName System.Drawing

$p = "public/MagnetInteraction/car_right_facing_left.png"
$bytes = [System.IO.File]::ReadAllBytes($p)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$bmp = [System.Drawing.Bitmap]::FromStream($ms)
$w = $bmp.Width
$h = $bmp.Height

# Function to get upper contour Y for car_right_facing_left (facing left: front on left, rear on right)
function Get-TopY($x) {
    if ($x -le 100) {
        # Front nose & hood tip: y is 145 down to 135
        return (145 - ($x / 100.0) * 10)
    } elseif ($x -le 300) {
        # Hood: from (100, 135) to (300, 95)
        return (135 - (($x - 100) / 200.0) * 40)
    } elseif ($x -le 460) {
        # Windshield: from (300, 95) to (460, 20)
        return (95 - (($x - 300) / 160.0) * 75)
    } elseif ($x -le 720) {
        # Roof: y ≈ 16..20
        return 16
    } elseif ($x -le 860) {
        # Rear window: from (720, 20) to (860, 115)
        return (20 + (($x - 720) / 140.0) * 95)
    } else {
        # Trunk lid: from (860, 115) to (994, 135)
        return (115 + (($x - 860) / 134.0) * 20)
    }
}

for ($x = 0; $x -lt $w; $x++) {
    $cutoffY = [int](Get-TopY $x)
    for ($y = 0; $y -lt $cutoffY; $y++) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    }
}

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$rect = New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$bmp.Dispose()
$ms.Dispose()

$temp = "public/MagnetInteraction/temp_car_perfect.png"
$cropped.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()

Move-Item -Path $temp -Destination $p -Force
Write-Host "Perfect Curve Applied: $rect"
