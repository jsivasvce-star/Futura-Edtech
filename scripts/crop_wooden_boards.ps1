Add-Type -AssemblyName System.Drawing

function Inspect-And-Crop($inPath, $outPath) {
    Write-Host "Processing $inPath -> $outPath"
    $bmp = [System.Drawing.Bitmap]::FromFile($inPath)
    $w = $bmp.Width
    $h = $bmp.Height
    Write-Host "Original Width: $w, Height: $h"
    
    # Find bounding box of non-white pixels (where color is not near white R>240, G>240, B>240)
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0
    
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $bmp.GetPixel($x, $y)
            $isWhite = ($c.A -lt 20) -or ($c.R -gt 242 -and $c.G -gt 242 -and $c.B -gt 242)
            if (-not $isWhite) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    Write-Host "Bounding Box: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
    $cropW = $maxX - $minX + 1
    $cropH = $maxY - $minY + 1
    Write-Host "Cropped size: ${cropW}x${cropH}"
    
    # Create cropped bitmap with transparency for any remaining outer white pixels
    $cropBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $origX = $minX + $x
            $origY = $minY + $y
            $c = $bmp.GetPixel($origX, $origY)
            $isWhite = ($c.A -lt 20) -or ($c.R -gt 245 -and $c.G -gt 245 -and $c.B -gt 245)
            if ($isWhite) {
                $cropBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $cropBmp.SetPixel($x, $y, $c)
            }
        }
    }
    
    $cropBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropBmp.Dispose()
    $bmp.Dispose()
    Write-Host "Saved to $outPath"
}

Inspect-And-Crop "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790672347332.png" "c:\projects\Futura-Edtech\public\MagnetInteraction\wooden_board_same_poles.png"
Inspect-And-Crop "C:\Users\akash\.gemini\antigravity-ide\brain\8af30d10-4b5b-4e13-9e8e-798c9e05ff04\.user_uploaded\media_1790672353057.png" "c:\projects\Futura-Edtech\public\MagnetInteraction\wooden_board_opposite_poles.png"
