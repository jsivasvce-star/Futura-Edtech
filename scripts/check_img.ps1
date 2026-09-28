Add-Type -AssemblyName System.Drawing

$files = @(
    "C:\Users\akash\.gemini\antigravity-ide\brain\307f8e69-1a62-47a3-98a5-2f9dfe7268c4\.user_uploaded\media_1790512223274.png",
    "c:\projects\Futura-Edtech\public\FunWithMagnets\alpine_lake_viaduct_bg.png",
    "c:\projects\Futura-Edtech\public\FunWithMagnets\alpine_lake_viaduct_bg_hd.png",
    "c:\projects\Futura-Edtech\public\FunWithMagnets\alpine_lake_viaduct_bg_ultra4k.png"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $img = [System.Drawing.Image]::FromFile($f)
        Write-Output "$f => Width: $($img.Width)px, Height: $($img.Height)px, Format: $($img.PixelFormat)"
        $img.Dispose()
    } else {
        Write-Output "$f => Not found"
    }
}
