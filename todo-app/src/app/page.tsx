import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 md:px-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Your Name</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="#projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
            <li><Link href="#skills" className="text-muted-foreground hover:text-primary">Skills</Link></li>
            <li><Link href="#about" className="text-muted-foreground hover:text-primary">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
          <p className="text-xl text-muted-foreground mb-8">I'm a passionate developer creating amazing web experiences</p>
          <div className="flex justify-center space-x-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </section>

        <section id="projects" className="py-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((project) => (
              <Card key={project}>
                <CardHeader>
                  <CardTitle>Project {project}</CardTitle>
                  <CardDescription>A brief description of the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={`Project ${project}`}
                    width={400}
                    height={200}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="skills" className="py-12">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((skill) => (
              <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="py-12">
          <h3 className="text-2xl font-semibold mb-6">About Me</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Your Name"
              width={200}
              height={200}
              className="rounded-full"
            />
            <p className="text-lg text-muted-foreground">
              Here's a brief introduction about yourself. Highlight your passion for development,
              your experience, and what drives you in your career. Don't forget to mention any
              unique skills or perspectives you bring to your work.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2023 Your Name. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
