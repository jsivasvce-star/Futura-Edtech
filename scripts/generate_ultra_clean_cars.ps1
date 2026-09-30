Add-Type -AssemblyName System.Drawing

function Generate-UltraCleanCar {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$FacingDirection # 1 = Facing Right, -1 = Facing Left
    )

    $src = [System.Drawing.Bitmap]::new($InputPath)
    $w = $src.Width
    $h = $src.Height
    $out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    # 1. Detect Wheel Centers
    $w1Pts = @(); $w2Pts = @()
    for ($y = 180; $y -le 355; $y++) {
        for ($x = 100; $x -le 320; $x++) {
            $c = $src.GetPixel($x, $y)
            if ($c.R -gt 150 -and $c.G -gt 135 -and $c.B -gt 115) {
                $w1Pts += [System.Drawing.Point]::new($x, $y)
            }
        }
        for ($x = 700; $x -le 920; $x++) {
            $c = $src.GetPixel($x, $y)
            if ($c.R -gt 150 -and $c.G -gt 135 -and $c.B -gt 115) {
                $w2Pts += [System.Drawing.Point]::new($x, $y)
            }
        }
    }

    $cx1 = [int]($w1Pts | Measure-Object -Property X -Average).Average
    $cy1 = [int]($w1Pts | Measure-Object -Property Y -Average).Average
    $cx2 = [int]($w2Pts | Measure-Object -Property X -Average).Average
    $cy2 = [int]($w2Pts | Measure-Object -Property Y -Average).Average
    $wheelRadius = 77
    $rockerY = 286

    Write-Host "Wheels: ($cx1, $cy1), ($cx2, $cy2)"

    # 2. Mark Car Mask
    $mask = New-Object 'bool[,]' $w, $h

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            # Floor rule: below wheel baseline (y > 354) is 100% floor
            if ($y -gt 354) { continue }

            # Floor rule between wheels: below rocker panel (y >= 286) and not inside either wheel
            $d1 = [Math]::Sqrt([Math]::Pow($x - $cx1, 2) + [Math]::Pow($y - $cy1, 2))
            $d2 = [Math]::Sqrt([Math]::Pow($x - $cx2, 2) + [Math]::Pow($y - $cy2, 2))
            if ($y -ge $rockerY -and $d1 -gt $wheelRadius -and $d2 -gt $wheelRadius) {
                # Check if it's front/rear bumper chin or overhang (bumper bottom curve)
                $isBumperOverhang = $false
                if ($FacingDirection -eq 1) {
                    if ($x -gt $cx2 + $wheelRadius -and $y -le 286) { $isBumperOverhang = $true }
                    if ($x -lt $cx1 - $wheelRadius -and $y -le 280) { $isBumperOverhang = $true }
                } else {
                    if ($x -lt $cx1 - $wheelRadius -and $y -le 286) { $isBumperOverhang = $true }
                    if ($x -gt $cx2 + $wheelRadius -and $y -le 280) { $isBumperOverhang = $true }
                }
                if (-not $isBumperOverhang) {
                    continue
                }
            }

            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            $br = ($r + $g + $b) / 3.0

            # Inside wheel circle
            if ($d1 -le $wheelRadius -or $d2 -le $wheelRadius) {
                if ($br -gt 40) { $mask[$x, $y] = $true; continue }
            }

            # Wood body / roof / window:
            if ($r -ge 88 -and $g -ge 48 -and ($r - $b) -ge 20) {
                $mask[$x, $y] = $true
                continue
            }

            # Bright lights / chrome
            if ($br -gt 120 -and $r -gt 85) {
                $mask[$x, $y] = $true
                continue
            }

            # Inner car shadows (window pillars, door grooves)
            if ($y -ge 40 -and $y -le 290 -and $x -ge 20 -and $x -le $w - 20) {
                if ($r -ge 45 -and $g -ge 28 -and ($r - $b) -ge 10) {
                    $mask[$x, $y] = $true
                    continue
                }
            }
        }
    }

    # 3. Connected Components starting from Car Body Center + Both Wheels
    $visited = New-Object 'bool[,]' $w, $h
    $carComp = New-Object 'bool[,]' $w, $h
    $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()

    $seeds = @(
        [System.Drawing.Point]::new([int]($w/2), [int]($h/2)),
        [System.Drawing.Point]::new($cx1, $cy1),
        [System.Drawing.Point]::new($cx2, $cy2),
        [System.Drawing.Point]::new([int]($w/2), 150)
    )

    foreach ($s in $seeds) {
        if (-not $visited[$s.X, $s.Y]) {
            $visited[$s.X, $s.Y] = $true
            $carComp[$s.X, $s.Y] = $true
            $queue.Enqueue($s)
        }
    }

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
                        $carComp[$nx, $ny] = $true
                        $queue.Enqueue([System.Drawing.Point]::new($nx, $ny))
                    }
                }
            }
        }
    }

    # 4. Fill Interior Gaps (Door grooves, window pillars)
    for ($y = 40; $y -le 350; $y++) {
        for ($x = 20; $x -le $w - 20; $x++) {
            if (-not $carComp[$x, $y]) {
                $d1 = [Math]::Sqrt([Math]::Pow($x - $cx1, 2) + [Math]::Pow($y - $cy1, 2))
                $d2 = [Math]::Sqrt([Math]::Pow($x - $cx2, 2) + [Math]::Pow($y - $cy2, 2))
                if ($d1 -le $wheelRadius -or $d2 -le $wheelRadius -or $y -lt $rockerY) {
                    $hasAbove = $false; for ($k = $y - 1; $k -ge 20; $k--) { if ($carComp[$x, $k]) { $hasAbove = $true; break } }
                    $hasBelow = $false; for ($k = $y + 1; $k -le 354; $k++) { if ($carComp[$x, $k]) { $hasBelow = $true; break } }
                    $hasLeft  = $false; for ($k = $x - 1; $k -ge 10; $k--) { if ($carComp[$k, $y]) { $hasLeft  = $true; break } }
                    $hasRight = $false; for ($k = $x + 1; $k -le $w - 10; $k++) { if ($carComp[$k, $y]) { $hasRight = $true; break } }

                    if ($hasAbove -and $hasBelow -and $hasLeft -and $hasRight) {
                        $carComp[$x, $y] = $true
                    }
                }
            }
        }
    }

    # 5. Build Output Bitmap
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            if ($carComp[$x, $y]) {
                $c = $src.GetPixel($x, $y)
                $r = [int]$c.R
                $g = [int]$c.G
                $b = [int]$c.B
                $br = ($r + $g + $b) / 3.0

                # Smooth edge alpha
                $alpha = 255
                $isEdge = $false
                for ($i = 0; $i -lt 4; $i++) {
                    $nx = $x + $dx[$i]
                    $ny = $y + $dy[$i]
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        if (-not $carComp[$nx, $ny]) { $isEdge = $true; break }
                    }
                }
                if ($isEdge -and $br -lt 95) {
                    $alpha = [int][Math]::Max(60, [Math]::Min(255, ($br - 10) / 75.0 * 255))
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

    $cropX = [Math]::Max(0, $minX)
    $cropY = [Math]::Max(0, $minY)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + 1)
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + 1)

    $rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $cropped = $out.Clone($rect, $out.PixelFormat)
    $cropped.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Ultra Clean Saved: $OutputPath ($cropW x $cropH)"

    $src.Dispose()
    $out.Dispose()
    $cropped.Dispose()
}

$car1Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656333745.png"
$car2Path = "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790656413019.png"

Generate-UltraCleanCar $car1Path "public/MagnetInteraction/car_right_facing_left.png" -1
Generate-UltraCleanCar $car2Path "public/MagnetInteraction/car_left_facing_right.png" 1
