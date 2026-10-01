Add-Type -AssemblyName System.Drawing

function Analyze-Image($path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Host "File: $path"
    Write-Host "Dimensions: $($bmp.Width) x $($bmp.Height)"
    
    Write-Host "Corner samples:"
    Write-Host " (0,0): $($bmp.GetPixel(0,0))"
    Write-Host " (100,100): $($bmp.GetPixel(100,100))"
    Write-Host " (500,50): $($bmp.GetPixel(500,50))"
    Write-Host " (0,800): $($bmp.GetPixel(0,800))"
    
    # Fast lockbits analysis
    $rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
    $bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $ptr = $bmpData.Scan0
    $bytes = [Math]::Abs($bmpData.Stride) * $bmp.Height
    $rgbValues = New-Object byte[] $bytes
    [System.Runtime.InteropServices.Marshal]::Copy($ptr, $rgbValues, 0, $bytes)
    $bmp.UnlockBits($bmpData)
    
    $minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
    $stride = $bmpData.Stride
    
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $idx = $y * $stride + $x * 4
            $b = $rgbValues[$idx]
            $g = $rgbValues[$idx + 1]
            $r = $rgbValues[$idx + 2]
            
            $maxC = [Math]::Max($r, [Math]::Max($g, $b))
            if ($maxC -gt 15) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    Write-Host "Bounding Box (maxC > 15): X: $minX .. $maxX, Y: $minY .. $maxY, Width: $($maxX - $minX + 1), Height: $($maxY - $minY + 1)"
    $bmp.Dispose()
}

Analyze-Image "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846396019.jpg"
Write-Host "-------------------"
Analyze-Image "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846402266.jpg"
