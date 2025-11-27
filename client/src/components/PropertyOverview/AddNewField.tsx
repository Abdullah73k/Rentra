import { Banknote, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const AddNewField = ({ name, message }: { name: string; message: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{message}</p>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          <Plus className="h-4 w-4" />
          Add {name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddNewField;
