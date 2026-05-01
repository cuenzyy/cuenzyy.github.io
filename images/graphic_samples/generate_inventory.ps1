$base = "c:\Users\vince\Desktop\Cuenza_Portfolio\cuenzyy.github.io\images\graphic_samples"
$output = "$env:TEMP\inventory.txt"

# META-ADS folders
"=== META-ADS ===" | Out-File $output -Encoding UTF8

@("Day One", "Fallen Yet  Not Forgotten", "Findigs", "Gnarly Pets", "MD", "Ocean Wash", "Scope Health", "Shankara", "Sri Sri Tattva") | ForEach-Object {
    $folder = $_
    $path = Join-Path $base "META-ADS\$folder"
    $files = @(Get-ChildItem -Path $path -File | Sort-Object Name)
    "`n$folder : $($files.Count) images" | Add-Content $output
    $files | ForEach-Object { "  - $($_.Name)" } | Add-Content $output
}

# REALITY-RACING.CO
"`n=== REALITY-RACING.CO ===" | Add-Content $output

@("BLACK", "WHITE") | ForEach-Object {
    $folder = $_
    $path = Join-Path $base "Others\REALITY-RACING.CO\$folder"
    $files = @(Get-ChildItem -Path $path -File | Sort-Object Name)
    "`n$folder : $($files.Count) images" | Add-Content $output
    $files | ForEach-Object { "  - $($_.Name)" } | Add-Content $output
}

Write-Host "Saved to $output"
Get-Content $output
