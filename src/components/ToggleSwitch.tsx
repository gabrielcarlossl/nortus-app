/**
 * @fileoverview Componente de Toggle Switch
 *
 * @description
 * Switch reutilizável estilo iOS para ativar/desativar opções.
 *
 * @author Loomi Platform
 * @version 1.0.0
 */

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function ToggleSwitch({ checked = false, onChange }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );
}
