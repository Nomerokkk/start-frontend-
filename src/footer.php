<? 
	include 'templates/vars.php';
?>

	</div> <!-- end .wrapper -->

	<!-- modals -->
	<? include 'templates/modals.php'; ?>

	<!-- .up -->
	<a href="#top" class="up btn arrow j-up">
		<svg>
			<use xlink:href="<?= $target; ?>/img/icons.svg#arrow"/>
		</svg>
	</a>

	<!-- .loader -->
	<div class="loader j-loader">
		<div class="loader__inner">
			<img src="<?= $target; ?>/img/loader.svg" alt="loader" role="presentation">
		</div>
	</div>

	<!-- .messages -->
	<div class="messages j-messages"></div>


	<!-- scripts -->
	<script>
		const target = '<?= $target; ?>',
			text_search = 'Search',
			text_errors = 'Please, fill the required fields.',
			text_readmore = '+',
			lang = 'en';
	</script>
	
	<script src="<?= $target; ?>/js/first.bundle.js"></script>
	<script src="<?= $target; ?>/js/index.bundle.js"></script>
</body>
</html>