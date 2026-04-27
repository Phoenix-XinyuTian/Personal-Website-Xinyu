import {
  siPython,
  siCplusplus,
  siJavascript,
  siTypescript,
  siPytorch,
  siTensorflow,
  siOpencv,
  siScikitlearn,
  siNumpy,
  siPandas,
  siGit,
  siGithub,
  siDocker,
  siLinux,
  siJupyter,
  siAnaconda,
} from "simple-icons";

export type SkillItem = { name: string; hex: string; path: string };

export const programmingSkills: SkillItem[] = [
  { name: "Python", hex: siPython.hex, path: siPython.path },
  { name: "C++", hex: siCplusplus.hex, path: siCplusplus.path },
  { name: "JavaScript", hex: siJavascript.hex, path: siJavascript.path },
  { name: "TypeScript", hex: siTypescript.hex, path: siTypescript.path },
];

export const cvmlSkills: SkillItem[] = [
  { name: "PyTorch", hex: siPytorch.hex, path: siPytorch.path },
  { name: "TensorFlow", hex: siTensorflow.hex, path: siTensorflow.path },
  { name: "OpenCV", hex: siOpencv.hex, path: siOpencv.path },
  { name: "scikit-learn", hex: siScikitlearn.hex, path: siScikitlearn.path },
  { name: "NumPy", hex: siNumpy.hex, path: siNumpy.path },
  { name: "Pandas", hex: siPandas.hex, path: siPandas.path },
];

export const toolsSkills: SkillItem[] = [
  { name: "Git", hex: siGit.hex, path: siGit.path },
  { name: "GitHub", hex: siGithub.hex, path: siGithub.path },
  { name: "Docker", hex: siDocker.hex, path: siDocker.path },
  { name: "Linux", hex: siLinux.hex, path: siLinux.path },
  { name: "Jupyter", hex: siJupyter.hex, path: siJupyter.path },
  { name: "Anaconda", hex: siAnaconda.hex, path: siAnaconda.path },
];
