import type { ResumeData } from "../types";

function SectionTitle(props: { children: string }) {
  return (
    <div className="section-title">
      <span>{props.children}</span>
      <div className="section-title-line" />
    </div>
  );
}

function Bullets(props: { items: string[] }) {
  const cleaned = props.items.map((s) => s.trim()).filter(Boolean);
  if (cleaned.length === 0) return null;
  return (
    <ul className="bullets">
      {cleaned.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

export function ResumePreview(props: { data: ResumeData }) {
  const { data } = props;

  return (
    <div className="resume" id="resume">
      <div className="resume-header">
        <div className="resume-name">{data.basics.name || "（姓名）"}</div>
        <div className="resume-meta">
          <span>{data.basics.city}</span>
          <span className="dot">·</span>
          <span>{data.basics.phone}</span>
          <span className="dot">·</span>
          <span>{data.basics.email}</span>
        </div>
        {data.basics.links.filter(Boolean).length > 0 && (
          <div className="resume-links">
            {data.basics.links.filter(Boolean).join(" | ")}
          </div>
        )}
        {data.basics.target && (
          <div className="resume-target">{data.basics.target}</div>
        )}
      </div>

      <div className="resume-body">
        <SectionTitle>教育背景</SectionTitle>
        <div className="section">
          {data.education.length === 0 ? (
            <div className="placeholder">请在左侧添加教育经历。</div>
          ) : (
            data.education.map((e, idx) => (
              <div className="item" key={idx}>
                <div className="item-head">
                  <div className="item-title">
                    {e.school} · {e.major}（{e.degree}）
                  </div>
                  <div className="item-time">
                    {e.start} - {e.end}
                  </div>
                </div>
                <div className="item-sub">
                  {(e.gpa || e.ranking) && (
                    <div className="item-tags">
                      {e.gpa && <span className="tag">GPA {e.gpa}</span>}
                      {e.ranking && <span className="tag">排名 {e.ranking}</span>}
                    </div>
                  )}
                </div>
                <Bullets items={e.highlights} />
              </div>
            ))
          )}
        </div>

        <SectionTitle>科研经历</SectionTitle>
        <div className="section">
          {data.research.length === 0 ? (
            <div className="placeholder">请在左侧添加科研经历。</div>
          ) : (
            data.research.map((r, idx) => (
              <div className="item" key={idx}>
                <div className="item-head">
                  <div className="item-title">
                    {r.title} · {r.role}
                  </div>
                  <div className="item-time">
                    {r.start} - {r.end}
                  </div>
                </div>
                <div className="item-sub">
                  <div className="item-tags">
                    {r.advisor && <span className="tag">导师 {r.advisor}</span>}
                    {r.keywords
                      .map((k) => k.trim())
                      .filter(Boolean)
                      .slice(0, 6)
                      .map((k, i) => (
                        <span className="tag" key={i}>
                          {k}
                        </span>
                      ))}
                  </div>
                  {r.outcomes && <div className="item-outcomes">产出：{r.outcomes}</div>}
                </div>
                <Bullets items={r.bullets} />
              </div>
            ))
          )}
        </div>

        <SectionTitle>竞赛经历</SectionTitle>
        <div className="section">
          {data.competitions.length === 0 ? (
            <div className="placeholder">请在左侧添加竞赛/荣誉。</div>
          ) : (
            data.competitions.map((c, idx) => (
              <div className="item" key={idx}>
                <div className="item-head">
                  <div className="item-title">
                    {c.name} · {c.award}
                  </div>
                  <div className="item-time">{c.date}</div>
                </div>
                {c.description && <div className="item-desc">{c.description}</div>}
              </div>
            ))
          )}
        </div>

        <SectionTitle>自我评价</SectionTitle>
        <div className="section">
          {data.selfEvaluation.length === 0 ? (
            <div className="placeholder">请在左侧补充自我评价要点（建议 3-5 条）。</div>
          ) : (
            <Bullets items={data.selfEvaluation} />
          )}
        </div>
      </div>
    </div>
  );
}

