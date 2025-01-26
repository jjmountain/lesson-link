import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Video, FileQuestion, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <div className="w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-orange-300 to-orange-600">
          <div className="container mx-auto sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl max-w-3xl mx-auto">
                  Transform YouTube Videos into Language Lessons
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-orange-900/90 md:text-xl">
                  Turn any video into an interactive learning experience with AI-generated
                  exercises, vocabulary lists, and progress tracking - perfect for
                  language teachers.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-6 text-lg"
                  size="lg"
                  asChild
                >
                  <Link href="/signup">Create Your First Lesson →</Link>
                </Button>
                <Button
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg"
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <Link href="#features">How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-amber-50">
          <div className="container mx-auto sm:px-6 lg:px-8 py-16 md:py-24">
            <section id="features" className="px-4 md:px-6">
              <div className="mx-auto max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Designed for Language Educators
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Save hours of preparation time while creating more engaging lessons
                </p>
              </div>

              <div className="grid gap-12 md:grid-cols-3">
                <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-orange-50 transition">
                  <div className="mb-4 p-4 bg-orange-100 rounded-lg">
                    <Video className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Video Analysis</h3>
                  <p className="text-gray-600 text-center">
                    Automatically extract key vocabulary and grammar points from any
                    YouTube video
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-orange-50 transition">
                  <div className="mb-4 p-4 bg-orange-100 rounded-lg">
                    <FileQuestion className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Exercises</h3>
                  <p className="text-gray-600 text-center">
                    Generate context-aware quizzes, flashcards, and discussion questions
                    in seconds
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-orange-50 transition">
                  <div className="mb-4 p-4 bg-orange-100 rounded-lg">
                    <LineChart className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Student Progress Tracking
                  </h3>
                  <p className="text-gray-600 text-center">
                    Monitor comprehension with built-in analytics and automatic grading
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full bg-orange-50">
          <div className="container mx-auto sm:px-6 lg:px-8 py-16 md:py-24">
            <section className="px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                  Create Your First Lesson in 3 Steps
                </h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Paste a YouTube URL</h3>
                      <p className="text-gray-600">
                        Use any video - movie clips, news segments, or educational content
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Customize Your Content
                      </h3>
                      <p className="text-gray-600">
                        Edit automatically generated vocabulary lists, quizzes, and
                        discussion prompts
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Share with Students</h3>
                      <p className="text-gray-600">
                        Distribute via link, LMS integration, or printable worksheets
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full bg-orange-100">
          <div className="container mx-auto sm:px-6 lg:px-8 py-16 md:py-24">
            <section className="px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Ready to Transform Your Teaching?
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                      Join thousands of teachers using Lesson Link to create engaging,
                      interactive lessons.
                    </p>
                  </div>
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg"
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">Start Creating Free Lessons</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t bg-orange-50">
        <div className="container mx-auto sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Lesson Link Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-bold">LessonLink</span>
              </Link>
              <p className="text-sm text-gray-600">
                Empowering language teachers with AI-powered lesson creation
              </p>
            </div>
            <div className="flex gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold">Product</h4>
                <nav className="space-y-1">
                  <Link
                    href="#features"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/examples"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    Examples
                  </Link>
                </nav>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Company</h4>
                <nav className="space-y-1">
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-orange-600"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2024 LessonLink. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
