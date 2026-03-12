export type Education = {
  school: string;
  degree: "硕士" | "本科" | "博士" | "其他";
  major: string;
  start: string;
  end: string;
  gpa?: string;
  ranking?: string;
  highlights: string[];
};

export type Research = {
  title: string;
  role: string;
  advisor?: string;
  start: string;
  end: string;
  keywords: string[];
  bullets: string[];
  outcomes?: string;
};

export type Competition = {
  name: string;
  award: string;
  date: string;
  description: string;
};

export type ResumeData = {
  basics: {
    name: string;
    phone: string;
    email: string;
    city: string;
    links: string[];
    target: string;
  };
  education: Education[];
  research: Research[];
  competitions: Competition[];
  selfEvaluation: string[];
};

export const DEFAULT_RESUME_DATA: ResumeData = {
  basics: {
    name: "张三",
    phone: "138-0000-0000",
    email: "zhangsan@example.com",
    city: "北京",
    links: ["GitHub: https://github.com/yourname", "个人主页: https://your.site"],
    target: "目标：2026 年硕士研究生推荐免试（推免）面试"
  },
  education: [
    {
      school: "某某大学",
      degree: "本科",
      major: "计算机科学与技术",
      start: "2022.09",
      end: "2026.06",
      gpa: "3.8/4.0",
      ranking: "前 10%",
      highlights: ["主修课程：数据结构、操作系统、机器学习", "英语：CET-6 550"]
    }
  ],
  research: [
    {
      title: "基于图神经网络的推荐算法研究",
      role: "项目成员（建模与实验）",
      advisor: "李老师",
      start: "2024.03",
      end: "2025.01",
      keywords: ["GNN", "RecSys", "PyTorch"],
      bullets: [
        "复现并改进 baseline（LightGCN/NGCF），将 NDCG@10 提升 2.3%",
        "设计消融实验与超参搜索，输出可复现实验脚本与报告",
        "撰写技术文档，梳理数据处理与训练流程，降低团队上手成本"
      ],
      outcomes: "论文/预印本（准备中），代码已开源"
    }
  ],
  competitions: [
    {
      name: "全国大学生数学建模竞赛",
      award: "省级一等奖",
      date: "2024.09",
      description: "负责特征工程与模型评估，完成结果可视化与答辩材料整理。"
    }
  ],
  selfEvaluation: [
    "学习能力强：能快速从论文/文档中提炼可落地方案并完成实现",
    "科研习惯好：重视实验可复现性，善用对照实验与消融分析",
    "表达清晰：能将复杂技术点结构化讲清，并与团队高效协作"
  ]
};

