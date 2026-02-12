"use client";

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { createContext, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type CollapsibleContextType = {
  open: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      "Collapsible components must be used within a CollapsibleWithContext"
    );
  }

  return context;
}

function CollapsibleWithContext({
  defaultOpen,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = controlledOnOpenChange ?? setUncontrolledOpen;
  const value = useMemo(() => ({ open }), [open]);

  return (
    <CollapsibleContext.Provider value={value}>
      <Collapsible open={open} onOpenChange={setOpen} {...props} />
    </CollapsibleContext.Provider>
  );
}

function CollapsibleChevronsIcon(
  props: React.ComponentProps<typeof ChevronsUpDown>
) {
  const { open } = useCollapsibleContext();
  const Icon = open ? ChevronsDownUp : ChevronsUpDown;

  return (
    <Icon
      data-state={open ? "open" : "closed"}
      className={cn(
        "h-4 w-4 transition-transform duration-200",
        props.className
      )}
      {...props}
    />
  );
}

export {
  Collapsible,
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
};
