import { TodoProvider } from './context/TodoProvider.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { useThemeContext } from './context/useThemeContext.ts'
import { TodoForm } from './components/TodoForm.tsx'
import { TodoList } from './components/TodoList.tsx'

function TodoApp() {
  const { isDarkMode, toggleDarkMode } = useThemeContext()

  return (
    <TodoProvider>
      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <header className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">ToDo List</h1>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {isDarkMode ? '라이트 모드' : '다크 모드'}
            </button>
          </header>
          <TodoForm />
          <section
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            aria-label="ToDo 목록"
          >
            <TodoList title="ToDos" isCompleted={false} />
            <TodoList title="Completed" isCompleted={true} />
          </section>
        </div>
      </main>
    </TodoProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  )
}

export default App
