
import { personalInfo } from "@/utils/demoData";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Book, Briefcase, Home, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Skills Section */}
          <div className="lg:col-span-5 space-y-6 animate-fade-in">
            <h3 className="section-subtitle">My Skills</h3>
            <div className="grid grid-cols-1 gap-4">
              {personalInfo.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-foreground/60">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Info Tabs */}
          <div className="lg:col-span-7 animate-fade-in animate-delay-200">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <Book className="size-4" />
                  <span>Education</span>
                </TabsTrigger>
                <TabsTrigger value="work" className="flex items-center gap-2">
                  <Briefcase className="size-4" />
                  <span>Experience</span>
                </TabsTrigger>
                <TabsTrigger value="family" className="flex items-center gap-2">
                  <Home className="size-4" />
                  <span>Family</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <Users className="size-4" />
                  <span>Social</span>
                </TabsTrigger>
              </TabsList>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <TabsContent value="personal" className="mt-0">
                  <p className="text-card-foreground/80">
                    {personalInfo.about.personal}
                  </p>
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <p className="text-card-foreground/80">
                    {personalInfo.about.education}
                  </p>
                </TabsContent>

                <TabsContent value="work" className="mt-0">
                  <p className="text-card-foreground/80">
                    {personalInfo.about.workExperience}
                  </p>
                </TabsContent>

                <TabsContent value="family" className="mt-0">
                  <p className="text-card-foreground/80">{personalInfo.family}</p>
                </TabsContent>

                <TabsContent value="social" className="mt-0">
                  <p className="text-card-foreground/80">{personalInfo.social}</p>
                </TabsContent>
              </div>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col gap-2">
                  <h4 className="font-bold text-primary">Location</h4>
                  <p>{personalInfo.location}</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col gap-2">
                  <h4 className="font-bold text-primary">Email</h4>
                  <p className="truncate">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="hover:text-primary"
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover md:col-span-2">
                <CardContent className="p-6 flex flex-col gap-2">
                  <h4 className="font-bold text-primary">Phone</h4>
                  <p>
                    <a href={`tel:${personalInfo.phone}`} className="hover:text-primary">
                      {personalInfo.phone}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
