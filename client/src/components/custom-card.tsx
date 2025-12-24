import type React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type LucideProps } from "lucide-react";

type CardProps = {
  children: React.ReactNode;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
};

const CustomCard = ({ children, Icon, title }: CardProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
        {/* TODO: add functionality to edit button */}
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
