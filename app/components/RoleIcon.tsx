import Image from 'next/image';

type RoleIconProps = {
    role: "Tank" | "Bard" | "Cleric" | "Mage" | "Ranger" | "Fighter";
};

const roleIcons: Record<RoleIconProps["role"], string> = {
    Tank: "/tank.png",
    Bard: "/bard.png",
    Cleric: "/cleric.png",
    Mage: "/mage.png",
    Ranger: "/ranger.png",
    Fighter: "/fighter.png"
};

const RoleIcon: React.FC<RoleIconProps> = ({ role }) => {
    return (
        <Image
            src={roleIcons[role]}
            alt={`${role} Icon`}
            width={32}
            height={32}
        />
    );
};

export default RoleIcon;
