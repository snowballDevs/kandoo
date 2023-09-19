const ProfileIcon = ({fullName}) => {
    const generateHSL = (str) => {
        const hashCode = str
            .split('')
            .reduce((hash, char) => char.charCodeAt(0) + (hash << 5) - hash, 0);
        const h = Math.abs(hashCode) % 360; // Hue in degrees (0-359)
        const s = 50; // Saturation (50%)
        const l = 55 + (Math.abs(hashCode) % 10); // Lightness (55-64)
        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    const initials = fullName
        .split(' ')
        .map((name) => name[0].toUpperCase())
        .join('');

    const hslString = generateHSL(fullName);

    return (
        <span
            className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500'
            style={{backgroundColor: hslString}}
        >
            <span className='text-sm font-medium leading-none text-white'>
                {initials}
            </span>
        </span>
    );
};

export default ProfileIcon;
