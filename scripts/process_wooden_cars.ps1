Add-Type -AssemblyName System.Drawing

function Process-CarImage {
    param(
        [string]$InputPath,
        [string]$OutputCarPath,
        [string]$OutputWheelPath
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height

    # 1. Create transparent bitmap for Car Body (without dark background and without floor reflection)
    $carBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B

            # Background detection: dark background in upper half / sides, and floor reflection below wheels
            $isCar = $false

            # Wood body or window tone: R significantly higher than B, or bright cream wheel
            $isWood = ($r -gt 85 -and $g -gt 45 -and ($r - $b) -gt 25)
            $isCreamWheel = ($r -gt 160 -and $g -gt 155 -and $b -gt 135)
            $isDarkCarTrim = ($r -gt 45 -and $g -gt 30 -and $b -lt 60 -and $y -lt 520 -and $y -gt 150 -and $x -gt 40 -and $x -lt 980)

            # Wheel bottom line is around y = 515. Everything below y > 515 is floor reflection!
            if ($y -lt 518 -and ($isWood -or $isCreamWheel -or $isDarkCarTrim)) {
                $isCar = $true
            }

            if ($isCar) {
                # Smooth edge alpha
                $brightness = ($r + $g + $b) / 3.0
                $alpha = 255
                if ($brightness -lt 50) {
                    $alpha = [int](($brightness - 25) / 25.0 * 255)
                    if ($alpha -lt 0) { $alpha = 0 }
                }
                $carBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
                
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            } else {
                $carBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }

    Write-Host "Detected Car Bounding Box: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
    
    # Add padding
    $pad = 10
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + $pad * 2)
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + $pad * 2)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $croppedCar = $carBmp.Clone($rect, $carBmp.PixelFormat)
    $croppedCar.Save($OutputCarPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved: $OutputCarPath ($cropW x $cropH)"

    $src.Dispose()
    $carBmp.Dispose()
    $croppedCar.Dispose()
}

Process-CarImage "public/MagnetInteraction/car_facing_left_raw.jpg" "public/MagnetInteraction/car_right_facing_left.png" "public/MagnetInteraction/wheel_1.png"
Process-CarImage "public/MagnetInteraction/car_facing_right_raw.jpg" "public/MagnetInteraction/car_left_facing_right.png" "public/MagnetInteraction/wheel_2.png"
