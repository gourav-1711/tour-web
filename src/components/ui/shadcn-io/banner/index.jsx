"use client";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { XIcon, AlertCircle } from "lucide-react";
import { createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { onCloseBanner } from "@/lib/feautures/offerDetails";

export const BannerContext = createContext({
  show: true,
  setShow: () => {},
});

export const Banner = ({
  children,
  visible,
  defaultVisible = true,
  onClose,
  className,
  inset = false,
  discount,
  ...props
}) => {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  const bannerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      marginBottom: "0.75rem",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <BannerContext.Provider value={{ show, setShow }}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={bannerVariants}
            className={cn(
              "group relative flex w-full items-center justify-between gap-3 overflow-hidden px-6 py-3 text-white",
              "bg-gradient-to-r from-primary/80 via-primary to-primary/80 backdrop-blur-md",
              "border border-white/10 shadow-lg",
              "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] before:from-white/10 before:to-transparent",
              "after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]",
              inset && "rounded-xl",
              className
            )}
            {...props}
          >
            <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />

            <motion.div
              className="relative z-10 flex w-full items-center gap-3"
              variants={contentVariants}
            >
              {discount && (
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm ">
                  <span className="text-sm font-bold text-white">
                    {discount}% OFF
                  </span>
                  <div className="h-4 w-px bg-white/30" />
                </div>
              )}
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BannerContext.Provider>
  );
};

export const BannerIcon = ({
  icon: Icon = AlertCircle,
  className,
  ...props
}) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className={cn(
      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 p-1.5 text-white backdrop-blur-sm animate-bounce",
      "ring-1 ring-white/20",
      className
    )}
    {...props}
  >
    <Icon size={16} className="text-white " />
  </motion.div>
);

export const BannerTitle = ({ className, ...props }) => (
  <motion.p
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className={cn("flex-1 text-md font-medium text-white/90", className)}
    {...props}
  />
);

export const BannerAction = ({
  variant = "outline",
  size = "sm",
  className,
  ...props
}) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <Button
      className={cn(
        "shrink-0 border-white/30 bg-white/10 text-white backdrop-blur-sm",
        "hover:bg-white/90 hover:border-white/40",
        "transition-all duration-200",
        "shadow-sm hover:shadow-md",
        className
      )}
      size={size}
      variant={variant}
      {...props}
    />
  </motion.div>
);

export const BannerClose = ({
  variant = "ghost",
  size = "icon",
  onClick,
  className,
  ...props
}) => {
  const dispatch = useDispatch();
  const { setShow } = useContext(BannerContext);

  const handleClick = (e) => {
    setShow(false);
    dispatch(onCloseBanner());
    onClick?.(e);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="shrink-0"
    >
      <Button
        className={cn(
          "h-8 w-8 rounded-full bg-white/10 p-0 text-white/80 backdrop-blur-sm",
          "hover:bg-white/20 hover:text-white",
          "transition-all duration-200",
          className
        )}
        onClick={handleClick}
        size={size}
        variant={variant}
        {...props}
      >
        <XIcon size={16} className="text-white" />
      </Button>
    </motion.div>
  );
};
