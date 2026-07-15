const initialColumns = [
	{
		id: "backlog",
		label: "Бэклог",
		tasks: [
			{ id: '1', title: "Сделать дизайн" },
			{ id: '2', title: "Создать API" },
			],
	},
	{
		id: "processing",
		label: "В процессе",
		tasks: [
		{ id: '3', title: "Верстка" },
		],
	},
	{
		id: "done",
		label: "Готово",
		tasks: [
		{ id: '4', title: "Создать репозиторий" },
		],
	},
	{
		id: "trash",
		label: "Корзина",
		tasks: [],
	},
];

export default initialColumns;