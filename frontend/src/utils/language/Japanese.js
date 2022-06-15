export default {
    installationPrepare: {
        title: 'Go+オンラインインストーラーへようこそ',
        start: 'インストールを開始する',
        selectRelease: 'バージョン選択',
        check: '環境をチェックして修正してください...'
    },
    errorGoEnvironment: {
        error: '環境エラー',
        reason: '理由',
        errorEnvironment: '最初に Go をインストールし、PATH環境変数にGOが追加されていることを確認してください',
        errorVersion: 'Go 1.16以降が必要です',
        recheck: 'Go 環境の再確認',
        downloadGo: 'ダウンロード Go',
        abnormal: '内部例外については、Go と GoPATH の環境変数が正しいかどうかを確認してください、正しくない場合は Github に移動してフィードバックを送ってください'
    },
    errorNetwork: {
        error: 'ネットワークエラー',
        recheck: 'ネットワークを再チェックする'
    },
    installationWaiting: {
        start: 'インストール',
        end: 'インストールが完了しました',
        error: 'インストールに失敗しました',
        close: '終了'
    },
    installStatus: {
        init: '初期設定中...',
        download: 'インストールパッケージのダウンロードを開始 ...',
        unzip: 'インストーラを解凍しています...',
        install: 'インストールスクリプトを実行中...',
        complete: 'Go+のインストールが完了しました〜',
        error: {
            reason: '理由',
            abnormal: '内部例外については、Githubにアクセスしてフィードバックを送ってください。',
            apiError: 'API事故、Github にアクセスし、フィードバックをお送りください',
            errorDownload: 'インストーラーのダウンロードに失敗しました、ネットワークを確認してください、それでも直らない場合はGithubにアクセスしてフィードバックしてください',
            errorUnzip: 'インストーラの解凍に失敗しました。インストーラが壊れていないか確認してください。それでも直らない場合は、Githubに移動してフィードバックしてください',
            errorInstall: 'インストールスクリプトの実行に失敗しました。インストーラが壊れていないか確認してください。それでも直らない場合は、Githubに移動してフィードバックしてください',
            errorCurrentGoPlusInfo: 'Go+のバージョン番号の取得に失敗しました。インストーラーが破損していないか確認してください。それでも修正できない場合は、Githubにアクセスしてフィードバックをお願いします'
        }
    }
};