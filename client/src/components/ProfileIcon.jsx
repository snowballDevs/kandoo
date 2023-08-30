// expectation is the input is `FirstName LastName` like `Keanu Reeves`
const ProfileIcon = ({firstLastName}) => {
    console.log(firstLastName);

    const getHashOfString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);
        return hash;
    };
    
    const normalizeHash = (hash, min, max) =>
        Math.floor((hash % (max - min)) + min);
    
    const hRange = [75, 235];
    const sRange = [55, 65];
    const lRange = [55, 65];
    
    const generateHSL = (name) => {
        const hash = getHashOfString(name);
        const h = normalizeHash(hash, hRange[0], hRange[1]);
        const s = normalizeHash(hash, sRange[0], sRange[1]);
        const l = normalizeHash(hash, lRange[0], lRange[1]);
        return [h, s, l];
    };
    
    const initials = firstLastName
        .split(' ')
        .map((n) => n[0])
        .join('');

        const hslColor = generateHSL(firstLastName);
        const hslString = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`;

    return (
        <span 
            className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500'
            style={{ backgroundColor: hslString }}
        >
            <span className='text-xs font-medium leading-none text-white'>
                {initials}
            </span>
        </span>
    );
};

export default ProfileIcon;
