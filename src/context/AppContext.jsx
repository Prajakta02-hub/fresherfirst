import { createContext, useContext } from "react";
import useLocalStorage from "../utils/useLocalStorage.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [skills, setSkills] = useLocalStorage("ff_skills", []);
  const [savedIds, setSavedIds] = useLocalStorage("ff_saved", []);
  const [applications, setApplications] = useLocalStorage("ff_apps", []);

  const toggleSkill = (skill) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );

  const toggleSave = (id) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const addApplication = (app) =>
    setApplications((prev) => [
      { ...app, appliedOn: new Date().toLocaleDateString("en-IN") },
      ...prev,
    ]);

  const hasApplied = (jobId) => applications.some((a) => a.jobId === jobId);

  return (
    <AppContext.Provider
      value={{
        skills,
        toggleSkill,
        savedIds,
        toggleSave,
        applications,
        addApplication,
        hasApplied,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
