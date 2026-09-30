Add-Type -AssemblyName System.Drawing

function Generate-PerfectCar {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$FacingDirection # 1 = Facing Right, -1 = Facing Left
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height
    $out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # 1. First Pass: Mark raw car pixels
    $mask = New-Object 'bool[,]' $w, $h

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            $br = ($r + $g + $b) / 3.0

            # Wheels baseline is y = 354
            if ($y -gt 355) {
                $mask[$x, $y] = $false
                continue
            }

            $isCar = $false

            # Wheel tires (cream color)
            if ($y -ge 180 -and $y -le 355) {
                if ($r -gt 150 -and $g -gt 135 -and $b -gt 115) {
                    $isCar = $true
                }
            }

            # Wooden body / windows / hood / roof / doors:
            # Note: car wood has R >= 95, G >= 55, and R-B >= 25
            if (-not $isCar -and $y -le 354) {
                if ($r -ge 90 -and $g -ge 50 -and ($r - $b) -ge 24) {
                    $isCar = $true
                }
            }

            # Chrome / lights / mirrors
            if (-not $isCar -and $y -le 354) {
                if ($br -gt 130 -and $r -gt 90) {
                    $isCar = $true
                }
            }

            # Dark details strictly INSIDE car (door lines, window trims, inner wheel spokes)
            # Only if y > 30 and y < 350, and surrounded by car pixels
            if (-not $isCar -and $y -ge 35 -and $y -le 350 -and $x -ge 20 -and $x -le $w - 20) {
                if ($r -ge 50 -and $g -ge 30 -and ($r - $b) -ge 10) {
                    $isCar = $true
                }
            }

            $mask[$x, $y] = $isCar
        }
    }

    # 2. Clean up: find the largest connected component (the car body itself)
    # BFS Flood fill from (w/2, h/2) which is definitely on the car
    $visited = New-Object 'bool[,]' $w, $h
    $carComponent = New-Object 'bool[,]' $w, $h
    $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()

    $seedX = [int]($w / 2)
    $seedY = [int]($h / 2)

    $visited[$seedX, $seedY] = $true
    $carComponent[$seedX, $seedY] = $true
    $queue.Enqueue([System.Drawing.Point]::new($seedX, $seedY))

    $dx = @(0, 0, 1, -1, 1, 1, -1, -1)
    $dy = @(1, -1, 0, 0, 1, -1, 1, -1)

    while ($queue.Count -gt 0) {
        $pt = $queue.Dequeue()
        for ($i = 0; $i -lt 8; $i++) {
            $nx = $pt.X + $dx[$i]
            $ny = $pt.Y + $dy[$i]
            if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                if (-not $visited[$nx, $ny]) {
                    $visited[$nx, $ny] = $true
                    if ($mask[$nx, $ny]) {
                        $carComponent[$nx, $ny] = $true
                        $queue.Enqueue([System.Drawing.Point]::new($nx, $ny))
                    }
                }
            }
        }
    }

    # 3. Fill internal holes (e.g. door lines, dark seams inside car)
    # A pixel is inside car if it has car pixels both above & below, and left & right
    for ($y = 35; $y -le 345; $y++) {
        for ($x = 25; $x -le $w - 25; $x++) {
            if (-not $carComponent[$x, $y]) {
                # Check top, bottom, left, right
                $hasAbove = $false; for ($k = $y - 1; $k -ge 20; $k--) { if ($carComponent[$x, $k]) { $hasAbove = $true; break } }
                $hasBelow = $false; for ($k = $y + 1; $k -le 354; $k++) { if ($carComponent[$x, $k]) { $hasBelow = $true; break } }
                $hasLeft  = $false; for ($k = $x - 1; $k -ge 10; $k--) { if ($carComponent[$k, $y]) { $hasLeft  = $true; break } }
                $hasRight = $false; for ($k = $x + 1; $k -le $w - 10; $k++) { if ($carComponent[$k, $y]) { $hasRight = $true; break } }

                if ($hasAbove -and $hasBelow -and $hasLeft -and $hasRight) {
                    $c = $src.GetPixel($x, $y)
                    # Exclude pure floor reflection
                    if ($y -lt 285 -or ($c.R -gt 70 -and $c.G -gt 40)) {
                        $carComponent[$x, $y] = $true
                    }
                }
            }
        }
    }

    # 4. Write output image with anti-aliasing
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            if ($carComponent[$x, $y]) {
                $c = $src.GetPixel($x, $y)
                $r = [int]$c.R
                $g = [int]$c.G
                $b = [int]$c.B
                $br = ($r + $g + $b) / 3.0

                # Edge smoothing
                $alpha = 255
                $isEdge = $false
                for ($i = 0; $i -lt 4; $i++) {
                    $nx = $x + $dx[$i]
                    $ny = $y + $dy[$i]
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        if (-not $carComponent[$nx, $ny]) {
                            $isEdge = $true
                            break
                        }
                    }
                }
                if ($isEdge -and $br -lt 95) {
                    $alpha = [int][Math]::Max(50, [Math]::Min(255, ($br - 15) / 80.0 * 255))
                }

                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))

                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            } else {
                $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }

    # Crop tightly
    $cropX = [Math]::Max(0, $minX)
    $cropY = [Math]::Max(0, $minY)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + 1)
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + 1)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $cropped = $out.Clone($rect, $out.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Component-Extracted Saved: $OutputPath ($cropW x $cropH) [minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY]"

    $src.Dispose()
    $out.Dispose()
    $cropped.Dispose()
}

$car1Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$car2Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

# Car 1 is facing Left -> car_right_facing_left.png
Generate-PerfectCar $car1Path "public/MagnetInteraction/car_right_facing_left.png" -1

# Car 2 is facing Right -> car_left_facing_right.png
Generate-PerfectCar $car2Path "public/MagnetInteraction/car_left_facing_right.png" 1
