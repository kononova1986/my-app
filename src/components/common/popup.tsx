import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  title?: string;
  trigger: React.ReactNode;
  messages: string;
  tooltip?: string;
  variantButton?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  variantConfirmButton?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  sizeButton?: "default" | "sm" | "lg" | "icon";
  hideButton?: boolean;
  onConfirm: () => void;
};

export const Popup = ({
  title,
  trigger,
  messages,
  tooltip,
  variantButton = "outline",
  variantConfirmButton = "default",
  sizeButton = "default",
  hideButton = true,
  onConfirm,
}: Props) => {
  return (
    <TooltipProvider delayDuration={300}>
      <AlertDialog>
        <Tooltip>
          {hideButton && (
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button variant={variantButton} size={sizeButton}>
                  {trigger}
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
          )}
          {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{messages}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={cn(buttonVariants({ variant: variantConfirmButton }))}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};
