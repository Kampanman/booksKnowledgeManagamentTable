const KnowledgeList = ({ list, onSelect }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc' or 'desc'
    const [perPage, setPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    // 検索・フィルタリング
    const filteredList = list.filter(item => 
        item.view_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ソート
    const sortedList = [...filteredList].sort((a, b) => {
        const titleA = a.view_title.toLowerCase();
        const titleB = b.view_title.toLowerCase();
        if (titleA < titleB) return sortOrder === 'asc' ? -1 : 1;
        if (titleA > titleB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // ページネーション計算
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = sortedList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedList.length / perPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 検索語や表示件数が変わったときは1ページ目に戻す
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, perPage]);

    return (
        <div className="card list-card">
            <div className="card-header">
                <h2><i className="fa-solid fa-list"></i> ナレッジ一覧</h2>
                <div className="card-controls">
                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="ナレッジタイトルで検索..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="clear-btn" onClick={() => setSearchQuery('')} aria-label="検索クリア">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                    
                    <div className="control-group">
                        <label>表示件数:</label>
                        <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                            <option value={10}>10件</option>
                            <option value={20}>20件</option>
                            <option value={50}>50件</option>
                            <option value={100}>100件</option>
                        </select>
                    </div>

                    <button 
                        className="btn btn-icon" 
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        title={sortOrder === 'asc' ? '降順でソート' : '昇順でソート'}
                    >
                        <i className={`fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up-a-z' : 'fa-arrow-down-z-a'}`}></i>
                        {sortOrder === 'asc' ? ' 昇順' : ' 降順'}
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th className="text-center" style={{ width: '120px' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.file_title || index}>
                                    <td className="font-semibold">{item.view_title}</td>
                                    <td className="text-center">
                                        <button className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }} onClick={() => onSelect(item)}>
                                            <i className="fa-solid fa-circle-check"></i> 選択
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-data">
                                    <i className="fa-regular fa-folder-open"></i>
                                    <p>該当するナレッジが見つかりませんでした。</p>
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
    );
};

window.KnowledgeList = KnowledgeList;
