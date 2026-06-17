const KnowledgeDetail = ({ detail, onBack }) => {
    const { view_title, view_cols, all_cols, data } = detail;
    const [expandedRow, setExpandedRow] = React.useState(null);

    // 「展開」ボタンのハンドラ
    const handleExpand = (rowIndex) => {
        // すでに展開されている行と同じなら閉じる、別ならその行を展開
        setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    };

    // 選択された行の、指定項目以外のデータを抽出
    const getExtraData = (row) => {
        if (!row) return [];
        return all_cols
            .filter(col => !view_cols.includes(col))
            .map(col => ({
                key: col,
                value: row[col]
            }));
    };

    const extraData = expandedRow !== null ? getExtraData(data[expandedRow]) : [];

    // 親の「選択しなおす」ボタンが押されるのを考慮して、アンマウント時にクリアする処理は不要（コンポーネントごと消えるため）。
    // 代わりに、別のアクション等でリセットしたい場合は親コンポーネントからのトリガーで行う。

    return (
        <div className="detail-container">
            <div className="card detail-card">
                <div className="card-header">
                    <h2>
                        <i className="fa-solid fa-book"></i> {view_title}
                    </h2>
                    <span className="badge">レコード数: {data.length}件</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {view_cols.map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                                <th className="text-center" style={{ width: '120px' }}>展開</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr 
                                        key={rowIndex} 
                                        className={expandedRow === rowIndex ? 'row-expanded-highlight' : ''}
                                    >
                                        {view_cols.map(col => (
                                            <td key={col}>{row[col] !== undefined ? row[col] : '-'}</td>
                                        ))}
                                        <td className="text-center">
                                            <button 
                                                className={`btn btn-sm ${expandedRow === rowIndex ? 'btn-danger' : 'btn-info'}`}
                                                onClick={() => handleExpand(rowIndex)}
                                            >
                                                <i className={`fa-solid ${expandedRow === rowIndex ? 'fa-compress' : 'fa-expand'}`}></i> {expandedRow === rowIndex ? '閉じる' : '展開'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={view_cols.length + 1} className="no-data">
                                        <i className="fa-regular fa-folder-open"></i>
                                        <p>データがありません。</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 展開エリア */}
            {expandedRow !== null && (
                <div className="card extra-data-card fade-in">
                    <div className="card-header">
                        <h3>
                            <i className="fa-solid fa-circle-info"></i> 詳細情報
                        </h3>
                        <button className="btn-close" onClick={() => setExpandedRow(null)} aria-label="詳細を閉じる">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="extra-data-content">
                        {extraData.length > 0 ? (
                            <div className="extra-data-grid">
                                {extraData.map((item, idx) => (
                                    <div key={idx} className="extra-data-item">
                                        <div className="extra-data-label">{item.key}</div>
                                        <div className="extra-data-value">{item.value || <span className="text-muted">（空）</span>}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-extra-data">展開可能な他の項目はありません。</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

window.KnowledgeDetail = KnowledgeDetail;
