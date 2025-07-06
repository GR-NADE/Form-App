export function updateContainerWidth(container)
{
    const vw = window.innerWidth;

    const minWidth = 28;
    const maxWidth = 80;
    const minScreen = 501;
    const maxScreen = 1440;

    if (vw < minScreen)
    {
        container.style.width = "";
        return;
    }

    let widthPercent;

    if (vw >= maxScreen)
    {
        widthPercent = minWidth;
    }
    else if (vw <= minScreen)
    {
        widthPercent = maxWidth
    }
    else
    {
        const scale = (maxWidth - minWidth) * ((maxScreen - vw) / (maxScreen - minScreen));
        widthPercent = minWidth + scale;
    }

    container.style.width = `${widthPercent}%`;
}