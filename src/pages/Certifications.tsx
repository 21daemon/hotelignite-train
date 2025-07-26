
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck } from "lucide-react";
import { getUserCertificates } from "@/services/training-service";
import { Certificate } from "@/types/training";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Certifications() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const loadCertificates = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userCertificates = await getUserCertificates(user.id);
        setCertificates(userCertificates);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, [user]);

  // Filter certificates based on active tab
  const filteredCertificates = certificates.filter(cert => {
    const expirationDate = new Date(cert.expiration_date);
    const isExpired = expirationDate < new Date();
    
    if (activeTab === "active") return !isExpired;
    return isExpired;
  });

  // Get certification level based on score
  const getCertificationLevel = (score: number) => {
    if (score >= 90) return { label: "Expert", color: "bg-green-500" };
    if (score >= 75) return { label: "Advanced", color: "bg-blue-500" };
    return { label: "Standard", color: "bg-amber-500" };
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Certifications</h1>
          <p className="text-muted-foreground">View and manage your certifications</p>
        </div>

        <Tabs defaultValue="active" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="active" className="px-8">Active</TabsTrigger>
              <TabsTrigger value="expired" className="px-8">Expired</TabsTrigger>
            </TabsList>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading certifications...</p>
            </div>
          ) : (
            <>
              <TabsContent value="active" className="space-y-6">
                {filteredCertificates.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium">No active certifications</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Complete training modules to earn certifications
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCertificates.map((cert) => (
                      <Card key={cert.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{cert.training_modules?.title || "Certification"}</CardTitle>
                              <CardDescription className="mt-1">
                                {cert.training_modules?.category?.replace("_", " ")}
                              </CardDescription>
                            </div>
                            <Award className="h-6 w-6 text-amber-500" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex flex-col">
                              <div className="text-sm text-muted-foreground">Issue Date</div>
                              <div className="font-medium">{format(new Date(cert.issue_date), "MMMM d, yyyy")}</div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-sm text-muted-foreground">Expiration Date</div>
                              <div className="font-medium">{format(new Date(cert.expiration_date), "MMMM d, yyyy")}</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <div className="text-sm text-muted-foreground">Score</div>
                                <div className="font-medium">{cert.score}%</div>
                              </div>
                              <Badge className={`${getCertificationLevel(cert.score).color} text-white`}>
                                {getCertificationLevel(cert.score).label}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expired">
                {filteredCertificates.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium">No expired certifications</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        All your certifications are currently active
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Expired Certifications</CardTitle>
                      <CardDescription>
                        These certifications need renewal. Schedule a recertification to maintain compliance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Certification</TableHead>
                            <TableHead>Issued</TableHead>
                            <TableHead>Expired</TableHead>
                            <TableHead>Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCertificates.map((cert) => (
                            <TableRow key={cert.id}>
                              <TableCell className="font-medium">{cert.training_modules?.title}</TableCell>
                              <TableCell>{format(new Date(cert.issue_date), "MMM d, yyyy")}</TableCell>
                              <TableCell>{format(new Date(cert.expiration_date), "MMM d, yyyy")}</TableCell>
                              <TableCell>{cert.score}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
}
