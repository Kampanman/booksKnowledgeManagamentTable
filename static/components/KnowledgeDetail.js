const KnowledgeDetail = ({ detail, onBack }) => {
    const { view_title, view_cols, all_cols, data } = detail;
    const [expandedRow, setExpandedRow] = React.useState(null);
    const [perPage, setPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    // 表示件数や詳細データが変わったときは1ページ目に戻す
    React.useEffect(() => {
        setCurrentPage(1);
        setExpandedRow(null);
    }, [perPage, detail]);

    // 改行コード（\n, \r\n, /n, /r/n）の変換ユーティリティ
    const formatValue = (val) => {
        if (val === undefined || val === null) return '';
        const strVal = String(val).trim();
        if (strVal === '') return '';
        return strVal
            .replace(/\\r\\n/gi, '\n')
            .replace(/\\n/gi, '\n')
            .replace(/\/r\/n/gi, '\n')
            .replace(/\/n/gi, '\n');
    };

    // 「展開」ボタンのハンドラ
    const handleExpand = (globalIndex) => {
        // すでに展開されている行と同じなら閉じる、別ならその行を展開
        setExpandedRow(expandedRow === globalIndex ? null : globalIndex);
    };

    // ページ変更ハンドラ
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setExpandedRow(null);
    };

    // 選択された行の、指定項目以外のデータを抽出
    const getExtraData = (row) => {
        if (!row) return [];
        return all_cols
            .filter(col => !view_cols.includes(col))
            .map(col => ({
                key: col,
                value: formatValue(row[col])
            }));
    };

    // ページネーション計算
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / perPage);

    const extraData = expandedRow !== null ? getExtraData(data[expandedRow]) : [];

    return (
        <div className="detail-container">
            <div className="card detail-card">
                <div className="card-header">
                    <h2>
                        <i className="fa-solid fa-book"></i> {view_title}
                    </h2>
                    <div className="card-controls">
                        <span className="badge">レコード数: {data.length}件</span>
                        {data.length > 0 && (
                            <div className="control-group">
                                <label>表示件数:</label>
                                <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                                    <option value={10}>10件</option>
                                    <option value={20}>20件</option>
                                    <option value={50}>50件</option>
                                    <option value={100}>100件</option>
                                </select>
                            </div>
                        )}
                    </div>
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
                            {currentItems.length > 0 ? (
                                currentItems.map((row, index) => {
                                    const globalIndex = indexOfFirstItem + index;
                                    return (
                                        <tr 
                                            key={globalIndex} 
                                            className={expandedRow === globalIndex ? 'row-expanded-highlight' : ''}
                                        >
                                            {view_cols.map(col => {
                                                const formatted = formatValue(row[col]);
                                                return <td key={col}>{formatted !== '' ? formatted : '-'}</td>;
                                            })}
                                            <td className="text-center">
                                                <button 
                                                    className={`btn btn-sm ${expandedRow === globalIndex ? 'btn-danger' : 'btn-info'}`}
                                                    onClick={() => handleExpand(globalIndex)}
                                                >
                                                    <i className={`fa-solid ${expandedRow === globalIndex ? 'fa-compress' : 'fa-expand'}`}></i> {expandedRow === globalIndex ? '閉じる' : '展開'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
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

                {totalPages > 1 && (
                    <div className="pagination">
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="page-link"
                            aria-label="前のページ"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i} 
                                onClick={() => handlePageChange(i + 1)}
                                className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button 
                            disabled={currentPage === totalPages} 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="page-link"
                            aria-label="次のページ"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                )}
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
