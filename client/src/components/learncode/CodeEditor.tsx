import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

interface CodeEditorProps {
  language: string;
  defaultValue?: string;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

const CodeEditor = ({
  language,
  defaultValue = '',
  onRun,
  readOnly = false,
  height = '400px',
}: CodeEditorProps) => {
  const [code, setCode] = useState(defaultValue);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Exécution du code...');

    // Simuler l'exécution (en production, vous feriez un appel API)
    setTimeout(() => {
      try {
        if (language === 'javascript') {
          // Capture console.log
          const logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.join(' ')),
          };

          // Exécuter le code (ATTENTION: dangereux en production)
          const func = new Function('console', code);
          func(customConsole);

          setOutput(logs.join('\n') || 'Code exécuté avec succès !');
        } else {
          setOutput('Exécution simulée pour ' + language);
        }
      } catch (error: any) {
        setOutput(`Erreur: ${error.message}`);
      }
      setIsRunning(false);
    }, 1000);

    if (onRun) {
      onRun(code);
    }
  };

  const handleReset = () => {
    setCode(defaultValue);
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Card glass className="overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-sm text-gray-400 font-mono">
              {language}.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'html'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copié !' : 'Copier'}
            </Button>
            {!readOnly && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleReset}
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  Réinitialiser
                </Button>
                <Button
                  size="sm"
                  onClick={handleRun}
                  isLoading={isRunning}
                  icon={<Play className="w-4 h-4" />}
                >
                  Exécuter
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Editor */}
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly: readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Fira Code', monospace",
            fontLigatures: true,
          }}
        />
      </Card>

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card glass>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="font-semibold text-sm">Sortie du programme</h3>
            </div>
            <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
              {output}
            </pre>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default CodeEditor;