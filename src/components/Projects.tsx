
import { useState } from "react";
import { projects } from "@/utils/demoData";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectCategory = "all" | "big" | "mini" | "minor";
type TechFilter = string | null;

const Projects = () => {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [techFilter, setTechFilter] = useState<TechFilter>(null);

  // Extract unique technologies for the filter
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

  // Filter projects based on selected category and tech filter
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = category === "all" || project.category === category;
    const matchesTech =
      !techFilter || project.technologies.includes(techFilter);
    return matchesCategory && matchesTech;
  });

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <CategoryButton
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            All Projects
          </CategoryButton>
          <CategoryButton
            active={category === "big"}
            onClick={() => setCategory("big")}
          >
            Big Projects
          </CategoryButton>
          <CategoryButton
            active={category === "mini"}
            onClick={() => setCategory("mini")}
          >
            Mini Projects
          </CategoryButton>
          <CategoryButton
            active={category === "minor"}
            onClick={() => setCategory("minor")}
          >
            Minor Projects
          </CategoryButton>
        </div>

        {/* Technology Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          <TechButton
            active={techFilter === null}
            onClick={() => setTechFilter(null)}
          >
            All Technologies
          </TechButton>
          {allTechnologies.map((tech) => (
            <TechButton
              key={tech}
              active={techFilter === tech}
              onClick={() => setTechFilter(tech)}
            >
              {tech}
            </TechButton>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${
                    100 * (parseInt(project.id) % 10)
                  }ms`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No projects match the selected filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const CategoryButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className={cn(
        "transition-all duration-300",
        active && "shadow-md"
      )}
    >
      {children}
    </Button>
  );
};

const TechButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "rounded-full border border-border transition-all duration-300",
        active && "bg-primary/10 text-primary border-primary/30"
      )}
    >
      {children}
    </Button>
  );
};

export default Projects;
