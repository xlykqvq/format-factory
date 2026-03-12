import { useMemo } from "react";
import type { Competition, Education, Research, ResumeData } from "../types";

function Field(props: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="field">
      <div className="field-label">{props.label}</div>
      <input
        className="field-input"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea(props: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="field">
      <div className="field-label">{props.label}</div>
      <textarea
        className="field-textarea"
        value={props.value}
        placeholder={props.placeholder}
        rows={props.rows ?? 3}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
}

function ChipsEditor(props: {
  label: string;
  items: string[];
  placeholder?: string;
  onChange: (items: string[]) => void;
}) {
  const value = useMemo(() => props.items.join("\n"), [props.items]);
  return (
    <TextArea
      label={props.label}
      value={value}
      rows={4}
      placeholder={props.placeholder ?? "每行一条"}
      onChange={(v) =>
        props.onChange(
          v
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
    />
  );
}

function Card(props: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">{props.title}</div>
        {props.right ? <div className="card-right">{props.right}</div> : null}
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export function Editor(props: { data: ResumeData; onChange: (next: ResumeData) => void }) {
  const { data, onChange } = props;

  const setBasics = (patch: Partial<ResumeData["basics"]>) => {
    onChange({ ...data, basics: { ...data.basics, ...patch } });
  };

  const updateEducation = (idx: number, patch: Partial<Education>) => {
    const next = data.education.map((e, i) => (i === idx ? { ...e, ...patch } : e));
    onChange({ ...data, education: next });
  };

  const addEducation = () => {
    const next: Education = {
      school: "",
      degree: "本科",
      major: "",
      start: "",
      end: "",
      highlights: []
    };
    onChange({ ...data, education: [...data.education, next] });
  };

  const removeEducation = (idx: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== idx) });
  };

  const updateResearch = (idx: number, patch: Partial<Research>) => {
    const next = data.research.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    onChange({ ...data, research: next });
  };

  const addResearch = () => {
    const next: Research = {
      title: "",
      role: "",
      advisor: "",
      start: "",
      end: "",
      keywords: [],
      bullets: [],
      outcomes: ""
    };
    onChange({ ...data, research: [...data.research, next] });
  };

  const removeResearch = (idx: number) => {
    onChange({ ...data, research: data.research.filter((_, i) => i !== idx) });
  };

  const updateCompetition = (idx: number, patch: Partial<Competition>) => {
    const next = data.competitions.map((c, i) => (i === idx ? { ...c, ...patch } : c));
    onChange({ ...data, competitions: next });
  };

  const addCompetition = () => {
    const next: Competition = { name: "", award: "", date: "", description: "" };
    onChange({ ...data, competitions: [...data.competitions, next] });
  };

  const removeCompetition = (idx: number) => {
    onChange({ ...data, competitions: data.competitions.filter((_, i) => i !== idx) });
  };

  return (
    <div className="editor">
      <Card title="基本信息">
        <div className="grid2">
          <Field label="姓名" value={data.basics.name} onChange={(v) => setBasics({ name: v })} />
          <Field label="城市" value={data.basics.city} onChange={(v) => setBasics({ city: v })} />
          <Field label="电话" value={data.basics.phone} onChange={(v) => setBasics({ phone: v })} />
          <Field label="邮箱" value={data.basics.email} onChange={(v) => setBasics({ email: v })} />
        </div>
        <ChipsEditor
          label="链接（每行一条）"
          items={data.basics.links}
          onChange={(items) => setBasics({ links: items })}
          placeholder={"GitHub: https://github.com/xxx\n个人主页: https://xxx\nScholar: https://xxx"}
        />
        <Field
          label="求职/推免目标"
          value={data.basics.target}
          onChange={(v) => setBasics({ target: v })}
          placeholder="例如：2026 硕士研究生推荐免试（推免）面试"
        />
      </Card>

      <Card
        title="教育背景"
        right={
          <button className="btn" type="button" onClick={addEducation}>
            + 添加
          </button>
        }
      >
        {data.education.length === 0 ? <div className="hint">建议至少 1 条。</div> : null}
        {data.education.map((e, idx) => (
          <div className="group" key={idx}>
            <div className="group-head">
              <div className="group-title">教育经历 #{idx + 1}</div>
              <button className="btn danger" type="button" onClick={() => removeEducation(idx)}>
                删除
              </button>
            </div>
            <div className="grid2">
              <Field label="学校" value={e.school} onChange={(v) => updateEducation(idx, { school: v })} />
              <Field label="专业" value={e.major} onChange={(v) => updateEducation(idx, { major: v })} />
              <Field label="学位" value={e.degree} onChange={(v) => updateEducation(idx, { degree: v as Education["degree"] })} />
              <Field label="时间" value={`${e.start} - ${e.end}`.trim()} onChange={(v) => {
                const [start, end] = v.split("-").map((s) => s.trim());
                updateEducation(idx, { start: start ?? "", end: end ?? "" });
              }} placeholder="2022.09 - 2026.06" />
              <Field label="GPA" value={e.gpa ?? ""} onChange={(v) => updateEducation(idx, { gpa: v })} />
              <Field label="排名" value={e.ranking ?? ""} onChange={(v) => updateEducation(idx, { ranking: v })} placeholder="前 10%" />
            </div>
            <ChipsEditor
              label="亮点（每行一条）"
              items={e.highlights}
              onChange={(items) => updateEducation(idx, { highlights: items })}
              placeholder={"主修课程：...\n奖学金：...\n英语：CET-6 550"}
            />
          </div>
        ))}
      </Card>

      <Card
        title="科研经历"
        right={
          <button className="btn" type="button" onClick={addResearch}>
            + 添加
          </button>
        }
      >
        {data.research.map((r, idx) => (
          <div className="group" key={idx}>
            <div className="group-head">
              <div className="group-title">科研经历 #{idx + 1}</div>
              <button className="btn danger" type="button" onClick={() => removeResearch(idx)}>
                删除
              </button>
            </div>
            <div className="grid2">
              <Field label="题目" value={r.title} onChange={(v) => updateResearch(idx, { title: v })} />
              <Field label="角色/职责" value={r.role} onChange={(v) => updateResearch(idx, { role: v })} placeholder="项目成员/负责人..." />
              <Field label="导师（可选）" value={r.advisor ?? ""} onChange={(v) => updateResearch(idx, { advisor: v })} />
              <Field
                label="时间"
                value={`${r.start} - ${r.end}`.trim()}
                onChange={(v) => {
                  const [start, end] = v.split("-").map((s) => s.trim());
                  updateResearch(idx, { start: start ?? "", end: end ?? "" });
                }}
                placeholder="2024.03 - 2025.01"
              />
            </div>
            <ChipsEditor
              label="关键词（每行一条）"
              items={r.keywords}
              onChange={(items) => updateResearch(idx, { keywords: items })}
              placeholder={"GNN\nRecSys\nPyTorch"}
            />
            <ChipsEditor
              label="要点（每行一条）"
              items={r.bullets}
              onChange={(items) => updateResearch(idx, { bullets: items })}
              placeholder={"你做了什么（方法/实现）\n结果提升多少（指标/速度）\n实验/复现/文档等贡献"}
            />
            <Field
              label="产出（可选）"
              value={r.outcomes ?? ""}
              onChange={(v) => updateResearch(idx, { outcomes: v })}
              placeholder="论文/专利/开源/技术报告..."
            />
          </div>
        ))}
        {data.research.length === 0 ? <div className="hint">建议至少 1 条，突出你对“方法 + 实验 + 结果”的贡献。</div> : null}
      </Card>

      <Card
        title="竞赛经历"
        right={
          <button className="btn" type="button" onClick={addCompetition}>
            + 添加
          </button>
        }
      >
        {data.competitions.map((c, idx) => (
          <div className="group" key={idx}>
            <div className="group-head">
              <div className="group-title">竞赛/荣誉 #{idx + 1}</div>
              <button className="btn danger" type="button" onClick={() => removeCompetition(idx)}>
                删除
              </button>
            </div>
            <div className="grid2">
              <Field label="竞赛/荣誉" value={c.name} onChange={(v) => updateCompetition(idx, { name: v })} />
              <Field label="奖项" value={c.award} onChange={(v) => updateCompetition(idx, { award: v })} />
              <Field label="时间" value={c.date} onChange={(v) => updateCompetition(idx, { date: v })} placeholder="2024.09" />
            </div>
            <TextArea
              label="描述"
              value={c.description}
              onChange={(v) => updateCompetition(idx, { description: v })}
              rows={3}
              placeholder="你负责了什么、亮点是什么"
            />
          </div>
        ))}
        {data.competitions.length === 0 ? <div className="hint">没有也没关系，可写奖学金/荣誉称号/优秀学生等。</div> : null}
      </Card>

      <Card title="自我评价（每行一条）">
        <ChipsEditor
          label="要点"
          items={data.selfEvaluation}
          onChange={(items) => onChange({ ...data, selfEvaluation: items })}
          placeholder={"学习能力强：...\n科研习惯好：...\n表达清晰：..."}
        />
      </Card>
    </div>
  );
}

