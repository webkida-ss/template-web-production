<?php

/**
 * Plugin Name: Search Highlighter
 * Description: Highlight searched words when you search
 * Version: 1.0
 * Auther: Shun Sakakida
 * Auther URI: https://webkida.site/
 * 
 */

/**
 * 本プラグインが実行（読み込まれる？）タイミングで
 * インスタンスnewされてコンストラクタ内で定義しているフックが動作
 */

// ① クラス定義
class SearchHighLighter
{
	// ③ コンストラクタ：クラス作成時にフィルターフックを動作
	public function __construct()
	{
		// $this：疑似変数（自分自身のオブジェクト）
		// クラスを用いてフックする場合、第二引数は関数名ではなく配列形式：array（クラス名,メソッド名）
		add_filter('the_title', array($this, 'highlight_keywords'));
		add_filter('get_the_excerpt', array($this, 'highlight_keywords'));
	}
	// ④ 各種メソッドがコンストラクタから呼び出される
	public function highlight_keywords($text) // ここで受け取る
	{
		if (is_search()) {
			$keys = explode(' ', get_search_query()); // 検索文字列を「 」で分割しキーワードを取得
			foreach ($keys as $key) {
				// 各キーワードをハイライト設定
				// $textの中の$keyを探して、spanタグ囲みで置換
				$text = str_replace($key, '<span style="background:#ffff00";>' . $key . '</span>', $text);
			}
		}
		return $text;
	}
}

// ② インスタンスnew
$SearchHighlighter = new SearchHighLighter();
