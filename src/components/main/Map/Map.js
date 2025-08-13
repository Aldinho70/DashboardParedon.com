export const IframeMap = (longitud, latitud) => {
    return `<iframe 
                class="rounded"
                width="100%" height="100%" frameborder="0" style="border:0"
                src="https://maps.google.com/maps?q=${longitud},${latitud}&t=k&output=embed" 
                allowfullscreen>
            </iframe>`
}