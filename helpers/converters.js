export function bytesToSize(bytes, target = null, unit = true) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let i;
    if(target != null) {
        i = sizes.indexOf(target);
        if(i == null) {
            return 'n/a';
        }
    } else {
        if (bytes === 0) return 'n/a';
        i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes} ${sizes[i]})`;
    }
    if(!unit) {
        return (bytes / (1024 ** i)).toFixed(1);
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}
export function hertzToSpeed(hertz) {
    const sizes = ['Hertz', 'KHz', 'MHz', 'GHz', 'THz'];
    if (hertz === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(hertz) / Math.log(1000)), 10);
    if (i === 0) return `${hertz} ${sizes[i]})`;
    return `${(hertz / (1000 ** i)).toFixed(1)} ${sizes[i]}`;
}