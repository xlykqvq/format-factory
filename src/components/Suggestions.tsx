import type { ResumeData } from "../types";

type Suggestion = {
  title: string;
  details: string[];
  severity: "info" | "warn";
};

function isBlank(s: string | undefined | null) {
  return !s || s.trim().length === 0;
}

function anyBlank(arr: string[]) {
  return arr.map((s) => s.trim()).filter(Boolean).length === 0;
}

export function buildSuggestions(data: ResumeData): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (isBlank(data.basics.name) || isBlank(data.basics.phone) || isBlank(data.basics.email)) {
    suggestions.push({
      title: "补齐个人信息",
      severity: "warn",
      details: ["姓名/电话/邮箱尽量完整，避免导师或面试老师无法联系。"]
    });
  }

  if (data.education.length === 0) {
    suggestions.push({
      title: "添加教育背景",
      severity: "warn",
      details: ["至少 1 条：学校、专业、学位、起止时间。", "可补充：GPA、排名、核心课程、英语/语言成绩。"]
    });
  } else {
    const hasGpaOrRank = data.education.some((e) => !isBlank(e.gpa) || !isBlank(e.ranking));
    if (!hasGpaOrRank) {
      suggestions.push({
        title: "补充 GPA/排名（可选但加分）",
        severity: "info",
        details: ["如果有：GPA、专业排名/百分位、奖学金等建议写上。"]
      });
    }
  }

  if (data.research.length === 0) {
    suggestions.push({
      title: "添加科研经历",
      severity: "warn",
      details: ["写清：你负责什么、做了什么方法/实验、结果提升多少、有没有产出。", "可补充：导师/团队、关键词、代码/论文链接。"]
    });
  } else {
    const missingImpact = data.research.some((r) => anyBlank(r.bullets));
    if (missingImpact) {
      suggestions.push({
        title: "科研经历写出“可量化结果”",
        severity: "info",
        details: ["建议每条至少 2-3 个 bullet：方法/职责 + 结果（指标提升/速度提升/消融结论/贡献）。"]
      });
    }
    const missingOutcomes = data.research.every((r) => isBlank(r.outcomes));
    if (missingOutcomes) {
      suggestions.push({
        title: "补充科研产出（如有）",
        severity: "info",
        details: ["论文（投稿/在投/预印本）、专利、开源仓库、技术报告、获奖等都可以写。"]
      });
    }
  }

  if (data.competitions.length === 0) {
    suggestions.push({
      title: "添加竞赛/荣誉",
      severity: "info",
      details: ["写清：比赛名、奖项等级、时间、你负责的部分与亮点。", "也可写：奖学金、优秀学生、荣誉称号等。"]
    });
  }

  if (data.selfEvaluation.map((s) => s.trim()).filter(Boolean).length < 3) {
    suggestions.push({
      title: "自我评价建议 3-5 条",
      severity: "info",
      details: ["尽量写“证据型”表述：例如复现能力、工程能力、阅读论文、沟通协作、抗压与推进。"]
    });
  }

  suggestions.push({
    title: "还可以加哪些内容（可选）",
    severity: "info",
    details: [
      "项目经历（课程/实习/开源）：突出你的贡献与结果",
      "技能栈：语言、框架、工具（含论文复现/实验平台/可视化）",
      "科研兴趣与未来方向：和目标导师/课题组对齐",
      "面试准备材料：代表作链接、论文阅读清单、复现笔记"
    ]
  });

  return suggestions;
}

export function Suggestions(props: { data: ResumeData }) {
  const items = buildSuggestions(props.data);
  return (
    <div className="suggestions">
      <div className="suggestions-title">填写提醒 / 可添加项</div>
      <div className="suggestions-list">
        {items.map((s, idx) => (
          <div className={`suggestion ${s.severity}`} key={idx}>
            <div className="suggestion-title">{s.title}</div>
            <ul className="suggestion-details">
              {s.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

