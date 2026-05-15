import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { NavMenu } from "@/components/blocks/NavMenu";
import { MobileNavProfile } from "@/components/blocks/MobileNavProfile";
import { Card } from "@/components/ui/card";

export const NavigationSheet = () => {
    return (
        <div className="md:hidden">
            <Sheet>
                <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <SheetTrigger asChild>
                    <Button className="rounded-full size-9.5 border-1" size="icon" variant="outline">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="px-6 py-3">
                    <Logo />
                    <Card className={"flex flex-col items-center px-3"}>
                        <NavMenu className="[&>div]:h-full" orientation="vertical" />
                    </Card>
                    <MobileNavProfile />
                </SheetContent>
            </Sheet>
        </div>
    );
};
