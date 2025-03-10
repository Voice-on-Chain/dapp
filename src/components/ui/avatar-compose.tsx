import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const RAvatar = ({
  className,
  src = "https://avatar.iran.liara.run/public",
}: {
  className?: string;
  src?: string;
}) => {
  return (
    <Avatar className={cn("size-4", className)}>
      <AvatarImage
        src={src ?? "https://avatar.iran.liara.run/public"}
        className="object-cover object-center"
      />
      <AvatarFallback className="text-s10">VOC</AvatarFallback>
    </Avatar>
  );
};

export default RAvatar;
