
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Certification {
  id: string;
  title: string;
  date: Date;
  status: "scheduled" | "completed" | "cancelled";
  type: "initial" | "recertification";
}

interface CertificationSchedulerProps {
  certifications: Certification[];
}

export function CertificationScheduler({ certifications }: CertificationSchedulerProps) {
  const { toast } = useToast();
  const [items, setItems] = useState(certifications);

  const handleCancelCertification = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Certification cancelled",
      description: "The certification has been cancelled successfully."
    });
  };

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No certifications scheduled</p>
        <p className="text-sm text-muted-foreground">Click 'Schedule New' to add a certification</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((certification) => (
        <div
          key={certification.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{certification.title}</h3>
              <Badge variant={certification.type === "initial" ? "default" : "secondary"}>
                {certification.type === "initial" ? "Initial" : "Recertification"}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {format(certification.date, "MMMM d, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {format(certification.date, "h:mm a")}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-3 sm:mt-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel certification?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this certification? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => handleCancelCertification(certification.id)}
                  >
                    Cancel Certification
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
