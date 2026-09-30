Add-Type -AssemblyName System.Drawing

function Perfect-CarCutout {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$FacingDirection # 1 = Facing Right, -1 = Facing Left
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height
    $out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # 1. Determine wheel center coordinates and radii by finding white rim pixels
    $wheel1Pts = @() # Front/Rear wheel 1 (x ≈ 150..270)
    $wheel2Pts = @() # Front/Rear wheel 2 (x ≈ 750..870)

    for ($y = 180; $y -le 355; $y++) {
        for ($x = 100; $x -le 320; $x++) {
            $c = $src.GetPixel($x, $y)
            if ($c.R -gt 155 -and $c.G -gt 140 -and $c.B -gt 120) {
                $wheel1Pts += [System.Drawing.Point]::new($x, $y)
            }
        }
        for ($x = 700; $x -le 920; $x++) {
            $c = $src.GetPixel($x, $y)
            if ($c.R -gt 155 -and $c.G -gt 140 -and $c.B -gt 120) {
                $wheel2Pts += [System.Drawing.Point]::new($x, $y)
            }
        }
    }

    $cx1 = ($wheel1Pts | Measure-Object -Property X -Average).Average
    $cy1 = ($wheel1Pts | Measure-Object -Property Y -Average).Average
    $cx2 = ($wheel2Pts | Measure-Object -Property X -Average).Average
    $cy2 = ($wheel2Pts | Measure-Object -Property Y -Average).Average

    Write-Host "Wheel 1: ($cx1, $cy1), Wheel 2: ($cx2, $cy2)"

    # Wheel radius is ~76px
    $wheelRadius = 78

    # Rocker panel baseline between wheels:
    # Wood rocker panel sits at y ≈ 285
    $rockerY = 286

    # 2. Build top silhouette contour for each x
    $topContour = New-Object 'int[]' $w
    for ($x = 0; $x -lt $w; $x++) {
        $topContour[$x] = $h # default no car
        for ($y = 0; $y -lt 300; $y++) {
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            # Car body detection: warm wood (R>85, G>50, R-B>20) or bright trim (brightness > 120)
            if (($r -gt 85 -and $g -gt 50 -and ($r - $b) -gt 20) -or (($r+$g+$b)/3.0 -gt 130 -and $r -gt 90)) {
                # Verify it's not a background speck by checking 3 consecutive pixels below
                $confirm = 0
                for ($k = 1; $k -le 4; $k++) {
                    if ($y + $k -lt $h) {
                        $ck = $src.GetPixel($x, $y + $k)
                        if ([int]$ck.R -gt 70 -and [int]$ck.G -gt 40) { $confirm++ }
                    }
                }
                if ($confirm -ge 2) {
                    $topContour[$x] = $y
                    break
                }
            }
        }
    }

    # Smooth top contour to remove any isolated outliers
    for ($x = 1; $x -lt $w - 1; $x++) {
        if ($topContour[$x] -lt $h -and $topContour[$x-1] -lt $h -and $topContour[$x+1] -lt $h) {
            $avg = ($topContour[$x-1] + $topContour[$x+1]) / 2.0
            if ([Math]::Abs($topContour[$x] - $avg) -gt 8) {
                $topContour[$x] = [int]$avg
            }
        }
    }

    # 3. Build bottom silhouette contour for each x
    $botContour = New-Object 'int[]' $w
    for ($x = 0; $x -lt $w; $x++) {
        $botY = 354 # Max bottom (wheel bottom)

        # Distance to wheel 1 center
        $d1 = [Math]::Sqrt([Math]::Pow($x - $cx1, 2))
        # Distance to wheel 2 center
        $d2 = [Math]::Sqrt([Math]::Pow($x - $cx2, 2))

        if ($d1 -le $wheelRadius) {
            # Inside wheel 1 column span
            $dy = [Math]::Sqrt([Math]::Max(0, [Math]::Pow($wheelRadius, 2) - [Math]::Pow($x - $cx1, 2)))
            $botY = [Math]::Min(354, [int]($cy1 + $dy))
        } elseif ($d2 -le $wheelRadius) {
            # Inside wheel 2 column span
            $dy = [Math]::Sqrt([Math]::Max(0, [Math]::Pow($wheelRadius, 2) - [Math]::Pow($x - $cx2, 2)))
            $botY = [Math]::Min(354, [int]($cy2 + $dy))
        } elseif ($x -gt ($cx1 + $wheelRadius) -and $x -lt ($cx2 - $wheelRadius)) {
            # Between wheels (under rocker panel)
            $botY = $rockerY
        } else {
            # Front or rear overhang
            if ($FacingDirection -eq 1) {
                # Facing right: rear is left (x < cx1), front is right (x > cx2)
                if ($x -lt $cx1) {
                    # Rear overhang: slopes up slightly from y=278 to y=250 at tail
                    $p = [Math]::Max(0, ($cx1 - $wheelRadius - $x) / ($cx1 - $wheelRadius))
                    $botY = [int](278 - $p * 28)
                } else {
                    # Front overhang: slopes up from y=278 to y=260 at chin
                    $p = [Math]::Max(0, ($x - ($cx2 + $wheelRadius)) / ($w - ($cx2 + $wheelRadius)))
                    $botY = [int](278 - $p * 18)
                }
            } else {
                # Facing left: front is left (x < cx1), rear is right (x > cx2)
                if ($x -lt $cx1) {
                    # Front overhang: chin
                    $p = [Math]::Max(0, ($cx1 - $wheelRadius - $x) / ($cx1 - $wheelRadius))
                    $botY = [int](278 - $p * 18)
                } else {
                    # Rear overhang: tail
                    $p = [Math]::Max(0, ($x - ($cx2 + $wheelRadius)) / ($w - ($cx2 + $wheelRadius)))
                    $botY = [int](278 - $p * 28)
                }
            }
        }
        $botContour[$x] = $botY
    }

    # 4. Fill output bitmap with smooth alpha blending
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($x = 0; $x -lt $w; $x++) {
        $topY = $topContour[$x]
        $botY = $botContour[$x]

        if ($topY -lt $botY) {
            for ($y = 0; $y -lt $h; $y++) {
                if ($y -ge $topY -and $y -le $botY) {
                    $c = $src.GetPixel($x, $y)
                    $r = [int]$c.R
                    $g = [int]$c.G
                    $b = [int]$c.B
                    $br = ($r + $g + $b) / 3.0

                    # Anti-alias top and bottom edges
                    $alpha = 255
                    if ($y -eq $topY) {
                        $alpha = [int][Math]::Min(255, [Math]::Max(60, $br / 100.0 * 255))
                    } elseif ($y -eq $botY) {
                        $alpha = [int][Math]::Min(255, [Math]::Max(60, $br / 100.0 * 255))
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
    }

    # Crop tightly
    $cropX = [Math]::Max(0, $minX)
    $cropY = [Math]::Max(0, $minY)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + 1)
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + 1)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $cropped = $out.Clone($rect, $out.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Studio Perfect Saved: $OutputPath ($cropW x $cropH) [minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY]"

    $src.Dispose()
    $out.Dispose()
    $cropped.Dispose()
}

$car1Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$car2Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

# Car 1 is facing Left -> car_right_facing_left.png
Perfect-CarCutout $car1Path "public/MagnetInteraction/car_right_facing_left.png" -1

# Car 2 is facing Right -> car_left_facing_right.png
Perfect-CarCutout $car2Path "public/MagnetInteraction/car_left_facing_right.png" 1
