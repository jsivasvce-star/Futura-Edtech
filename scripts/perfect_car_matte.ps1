Add-Type -AssemblyName System.Drawing

function Refine-CarMatte {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$FacingDirection # 1 = Facing Right, -1 = Facing Left
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height

    # 1. Create a boolean array to track visited background pixels (BFS Flood Fill from edges)
    $isBg = New-Object 'bool[,]' $w, $h
    $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()

    # Helper function to check if a pixel is definitely outside background
    # Background in top is dark/blurry wood (R<75, G<45, B<35 or low brightness)
    # Floor background in bottom is wood texture table (y > wheel baseline or below chassis)
    function Test-IsBgSeed($x, $y) {
        if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h) { return $false }
        $c = $src.GetPixel($x, $y)
        $r = [int]$c.R
        $g = [int]$c.G
        $b = [int]$c.B
        $br = ($r + $g + $b) / 3.0

        # Top area: anything above the roof/hood/trunk
        if ($y -lt 180) {
            # Wood car body has strong saturation ($r - $b > 35) and brightness > 90
            if ($r -gt 95 -and ($r - $b) -gt 32 -and $g -gt 55) {
                return $false # This is car!
            }
            return $true # Outside background
        }

        # Bottom floor area: below the wheels baseline (y > 354)
        if ($y -ge 355) {
            return $true
        }

        # Between wheels bottom: chassis is around y=290..305. Floor under chassis y > 305 and x between wheels
        # Cream wheel has r>160, g>150, b>130
        $isCreamWheel = ($r -gt 150 -and $g -gt 135 -and $b -gt 115)
        $isCarWood = ($r -gt 90 -and $g -gt 50 -and ($r - $b) -gt 25)

        if (-not $isCreamWheel -and -not $isCarWood -and $br -lt 65) {
            return $true
        }

        return $false
    }

    # Add all edge pixels as seeds if they match background
    for ($x = 0; $x -lt $w; $x++) {
        # Top 5 rows
        for ($y = 0; $y -lt 15; $y++) {
            if (-not $isBg[$x, $y] -and (Test-IsBgSeed $x $y)) {
                $isBg[$x, $y] = $true
                $queue.Enqueue([System.Drawing.Point]::new($x, $y))
            }
        }
        # Bottom 5 rows
        for ($y = $h - 15; $y -lt $h; $y++) {
            if (-not $isBg[$x, $y]) {
                $isBg[$x, $y] = $true
                $queue.Enqueue([System.Drawing.Point]::new($x, $y))
            }
        }
    }
    for ($y = 0; $y -lt $h; $y++) {
        # Left 5 cols
        for ($x = 0; $x -lt 15; $x++) {
            if (-not $isBg[$x, $y] -and (Test-IsBgSeed $x $y)) {
                $isBg[$x, $y] = $true
                $queue.Enqueue([System.Drawing.Point]::new($x, $y))
            }
        }
        # Right 5 cols
        for ($x = $w - 15; $x -lt $w; $x++) {
            if (-not $isBg[$x, $y] -and (Test-IsBgSeed $x $y)) {
                $isBg[$x, $y] = $true
                $queue.Enqueue([System.Drawing.Point]::new($x, $y))
            }
        }
    }

    # Flood Fill outward
    $dx = @(0, 0, 1, -1, 1, 1, -1, -1)
    $dy = @(1, -1, 0, 0, 1, -1, 1, -1)

    while ($queue.Count -gt 0) {
        $pt = $queue.Dequeue()
        for ($i = 0; $i -lt 8; $i++) {
            $nx = $pt.X + $dx[$i]
            $ny = $pt.Y + $dy[$i]

            if ($nx -ge 0 -and $nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                if (-not $isBg[$nx, $ny]) {
                    # Test if neighbor is background
                    $c = $src.GetPixel($nx, $ny)
                    $r = [int]$c.R
                    $g = [int]$c.G
                    $b = [int]$c.B
                    $br = ($r + $g + $b) / 3.0

                    $isCarPixel = $false

                    # Wheel check (cream tire)
                    if ($ny -ge 190 -and $ny -le 355) {
                        if ($r -gt 155 -and $g -gt 140 -and $b -gt 120) {
                            $isCarPixel = $true
                        }
                    }

                    # Wood check
                    if ($r -gt 92 -and $g -gt 52 -and ($r - $b) -gt 28 -and $ny -le 354) {
                        $isCarPixel = $true
                    }

                    # Dark inner door/trim/shadow details of car
                    if ($isCarPixel -eq $false -and $ny -ge 40 -and $ny -le 350) {
                        # Car details: if within car bounds and not pure dark exterior
                        if ($r -gt 65 -and $g -gt 40 -and ($r - $b) -gt 15) {
                            $isCarPixel = $true
                        }
                    }

                    if (-not $isCarPixel) {
                        $isBg[$nx, $ny] = $true
                        $queue.Enqueue([System.Drawing.Point]::new($nx, $ny))
                    }
                }
            }
        }
    }

    # Build output bitmap
    $outBmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            if (-not $isBg[$x, $y] -and $y -le 354) {
                $c = $src.GetPixel($x, $y)
                $r = [int]$c.R
                $g = [int]$c.G
                $b = [int]$c.B
                $br = ($r + $g + $b) / 3.0

                # Anti-aliasing alpha at boundary
                $alpha = 255
                $hasBgNeighbor = $false
                for ($i = 0; $i -lt 4; $i++) {
                    $nx = $x + $dx[$i]
                    $ny = $y + $dy[$i]
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        if ($isBg[$nx, $ny]) { $hasBgNeighbor = $true; break }
                    }
                }
                if ($hasBgNeighbor -and $br -lt 90) {
                    $alpha = [int][Math]::Max(40, [Math]::Min(255, ($br - 10) / 70.0 * 255))
                }

                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))

                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            } else {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }

    # Crop tightly to car dimensions
    $cropX = [Math]::Max(0, $minX)
    $cropY = [Math]::Max(0, $minY)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + 1)
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + 1)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $cropped = $outBmp.Clone($rect, $outBmp.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Perfect Matte Saved: $OutputPath ($cropW x $cropH) [minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY]"

    $src.Dispose()
    $outBmp.Dispose()
    $cropped.Dispose()
}

$car1Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$car2Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

Refine-CarMatte $car1Path "public/MagnetInteraction/car_right_facing_left.png" -1
Refine-CarMatte $car2Path "public/MagnetInteraction/car_left_facing_right.png" 1
