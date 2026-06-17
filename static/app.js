const { useState, useEffect } = React;

const App = () => {
    const [knowledges, setKnowledges] = useState([]);
    const [selectedKnowledge, setSelectedKnowledge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // ナレッジ一覧の取得
    useEffect(() => {
        fetch('server.php?action=list')
            .then(res => {
                if (!res.ok) throw new Error('サーバーとの通信に失敗しました。');
                return res.json();
            })
            .then(data => {
                if (data && data.error) throw new Error(data.error);
                setKnowledges(data || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // スクロール監視 (「↑」ボタン用)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSelectKnowledge = (knowledge) => {
        setLoading(true);
        setError(null);
        fetch(`server.php?action=detail&file=${encodeURIComponent(knowledge.file_title)}`)
            .then(res => {
                if (!res.ok) throw new Error('データの読み込みに失敗しました。');
                return res.json();
            })
            .then(data => {
                if (data && data.error) throw new Error(data.error);
                setSelectedKnowledge(data);
                setLoading(false);
                // 画面上部にスクロール
                window.scrollTo({ top: 0, behavior: 'instant' });
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleBackToList = () => {
        setSelectedKnowledge(null);
        setError(null);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <i className="fa-solid fa-book-bookmark header-icon"></i>
                    <h1>わたしの読書ナレッジマネジメントテーブル</h1>
                </div>
            </header>

            <main className="app-main">
                {loading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>データを読み込んでいます...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>{error}</p>
                        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                            <i className="fa-solid fa-rotate"></i> 再読み込み
                        </button>
                    </div>
                )}

                {!loading && !error && !selectedKnowledge && (
                    <div className="fade-in">
                        <KnowledgeList 
                            list={knowledges} 
                            onSelect={handleSelectKnowledge} 
                        />
                    </div>
                )}

                {!loading && !error && selectedKnowledge && (
                    <div className="fade-in">
                        <div className="back-button-container">
                            <button className="btn btn-secondary btn-back" onClick={handleBackToList}>
                                <i className="fa-solid fa-arrow-left"></i> 選択しなおす
                            </button>
                        </div>
                        <KnowledgeDetail 
                            detail={selectedKnowledge} 
                            onBack={handleBackToList}
                        />
                    </div>
                )}
            </main>

            <footer className="app-footer">
                <p>&copy; 2026 わたしの読書ナレッジマネジメントテーブル<br />Created with Antigravity-CLI</p>
            </footer>

            {showScrollTop && (
                <button className="scroll-top-btn" onClick={scrollToTop} aria-label="トップへ戻る">
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}
        </div>
    );
};

// ReactDOMのレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
